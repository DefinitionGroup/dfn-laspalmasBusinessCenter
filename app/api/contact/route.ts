import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
  interest?: unknown;
  message?: unknown;
  locale?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

const REQUIRED_ENV_VARS = [
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASS",
  "FROM_EMAIL",
  "TO_EMAIL",
] as const;

const FIELD_LIMITS = {
  name: 100,
  company: 120,
  email: 254,
  phone: 40,
  interest: 120,
  message: 5_000,
} as const;

function readText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function hasValidOrigin(request: Request) {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "same-origin") return true;
  if (fetchSite && fetchSite !== "none") return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    const requestHost =
      request.headers.get("x-forwarded-host") || request.headers.get("host");
    return Boolean(requestHost && originHost === requestHost);
  } catch {
    return false;
  }
}

function getMissingEnvVars() {
  return REQUIRED_ENV_VARS.filter((key) => !process.env[key]?.trim());
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  if (!hasValidOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot fields are deliberately acknowledged without sending mail.
  if (readText(payload.website, 200)) {
    return NextResponse.json({ success: true });
  }

  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;
  const elapsed = Date.now() - startedAt;
  if (!startedAt || elapsed < 1_200 || elapsed > 86_400_000) {
    return NextResponse.json(
      { error: "Please wait a moment and try again." },
      { status: 400 },
    );
  }

  const name = readText(payload.name, FIELD_LIMITS.name);
  const company = readText(payload.company, FIELD_LIMITS.company);
  const email = readText(payload.email, FIELD_LIMITS.email).toLowerCase();
  const phone = readText(payload.phone, FIELD_LIMITS.phone);
  const interest = readText(payload.interest, FIELD_LIMITS.interest);
  const message = readText(payload.message, FIELD_LIMITS.message);
  const locale = payload.locale === "en" ? "en" : "es";

  if (!name || !email || !message || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Name, a valid email address, and a message are required." },
      { status: 400 },
    );
  }

  const missingEnvVars = getMissingEnvVars();
  if (missingEnvVars.length > 0) {
    console.error("Contact form configuration is incomplete:", missingEnvVars);
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  const port = Number(process.env.SMTP_PORT);
  if (!Number.isInteger(port) || port <= 0) {
    console.error("Contact form configuration error: invalid SMTP_PORT");
    return NextResponse.json(
      { error: "The contact form is temporarily unavailable." },
      { status: 503 },
    );
  }

  const fields = [
    ["Name", name],
    ["Company", company],
    ["Email", email],
    ["Phone", phone],
    ["Interest", interest],
  ].filter(([, value]) => value);

  const textDetails = fields.map(([label, value]) => `${label}: ${value}`).join("\n");
  const htmlDetails = fields
    .map(
      ([label, value]) =>
        `<tr><th align="left" style="padding:6px 18px 6px 0">${label}</th><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure:
        process.env.SMTP_SECURE?.trim().toLowerCase() === "true" || port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const subjectPrefix = locale === "en" ? "Website enquiry" : "Consulta web";
    const subjectName = name.replace(/[\r\n]+/g, " ");
    const subjectInterest = interest.replace(/[\r\n]+/g, " ");
    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      replyTo: email,
      subject: `${subjectPrefix}: ${subjectName}${subjectInterest ? ` · ${subjectInterest}` : ""}`,
      text: `${textDetails}\n\nMessage:\n${message}`,
      html: `
        <h2>${subjectPrefix}</h2>
        <table role="presentation">${htmlDetails}</table>
        <h3>Message</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(
      "Contact email failed:",
      error instanceof Error ? error.message : "Unknown SMTP error",
    );
    return NextResponse.json(
      { error: "The message could not be sent. Please try again later." },
      { status: 502 },
    );
  }
}
