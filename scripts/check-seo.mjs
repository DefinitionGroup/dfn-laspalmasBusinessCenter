const CANONICAL_ORIGIN = "https://www.laspalmasbusiness.center";
const baseUrl = new URL(process.argv[2] || "http://127.0.0.1:3000");

const pagePairs = [
  ["/es", "/en"],
  ["/es/despachos", "/en/private-offices"],
  ["/es/salas-de-reuniones", "/en/meeting-rooms"],
  ["/es/coworking", "/en/coworking"],
  ["/es/oficina-virtual", "/en/virtual-office"],
  ["/es/el-centro", "/en/the-center"],
  ["/es/contacto", "/en/contact"],
  ["/es/aviso-legal", "/en/aviso-legal"],
  ["/es/privacidad", "/en/privacidad"],
  ["/es/cookies", "/en/cookies"],
];

const singleLanguagePages = [["/es/sostenibilidad", "es"]];

const legacyRedirects = new Map([
  ["/contacto", "/es/contacto"],
  ["/aviso-legal", "/es/aviso-legal"],
  ["/politica-privacidad", "/es/privacidad"],
  ["/politica-cookies", "/es/cookies"],
  ["/alquiler-despachos-las-palmas", "/es/despachos"],
  ["/alquiler-oficinas-las-palmas", "/es/despachos"],
  ["/business-center-las-palmas", "/es/salas-de-reuniones"],
  ["/coworking", "/es/coworking"],
  ["/coworking-gran-canaria", "/es/coworking"],
  ["/que-es-coworking-y-para-que-sirve", "/es/coworking"],
  ["/oficina-virtual-las-palmas", "/es/oficina-virtual"],
  ["/centro-negocios-las-palmas/oficina-virtual-en-las-palmas-de-gran-canaria", "/es/oficina-virtual"],
  ["/somos-sostenibles", "/es/sostenibilidad"],
  ["/nuevos-espacios", "/es/despachos"],
  ["/oficina-centro-negocios", "/es/despachos"],
  ["/que-ofrecemos", "/es"],
  ["/15422-2", "/en"],
  ["/en/meeting-and-training-rooms", "/en/meeting-rooms"],
  ["/en/office-rental-in-las-palmas", "/en/private-offices"],
  ["/en/office-rentals-in-gran-canaria", "/en/private-offices"],
  ["/en/shared-work-spaces", "/en/coworking"],
  ["/en/what-is-coworking-and-what-is-it-for", "/en/coworking"],
  ["/what-is-coworking-and-what-is-it-for", "/en/coworking"],
  ["/why-choose-business-center-to-setup-your-office", "/en/the-center"],
]);

let failures = 0;

function report(pass, subject, detail) {
  console.log(`${pass ? "PASS" : "FAIL"} ${subject} :: ${detail}`);
  if (!pass) failures += 1;
}

function attribute(tag, name) {
  return tag.match(new RegExp(`${name}=["']([^"']*)["']`, "i"))?.[1] ?? null;
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function headLinks(html, relation) {
  return tags(html, "link").filter((tag) => attribute(tag, "rel")?.toLowerCase() === relation);
}

async function fetchPath(path, options = {}) {
  return fetch(new URL(path, baseUrl), { redirect: "manual", ...options });
}

for (const [spanishPath, englishPath] of pagePairs) {
  for (const [path, locale, peerPath] of [
    [spanishPath, "es", englishPath],
    [englishPath, "en", spanishPath],
  ]) {
    const response = await fetchPath(path);
    const html = await response.text();
    const canonical = attribute(headLinks(html, "canonical")[0] || "", "href");
    const alternateTags = headLinks(html, "alternate");
    const alternates = new Map(
      alternateTags
        .map((tag) => [attribute(tag, "hreflang"), attribute(tag, "href")])
        .filter(([language, href]) => language && href),
    );
    const htmlLang = attribute(html.match(/<html\b[^>]*>/i)?.[0] || "", "lang");
    const h1Count = [...html.matchAll(/<h1\b/gi)].length;
    const ogUrlTag = tags(html, "meta").find((tag) => attribute(tag, "property") === "og:url");
    const expectedCanonical = `${CANONICAL_ORIGIN}${path}`;
    const expectedPeer = `${CANONICAL_ORIGIN}${peerPath}`;

    report(response.status === 200, path, `HTTP ${response.status}`);
    report(canonical === expectedCanonical, path, `canonical ${canonical ?? "missing"}`);
    report(alternates.get(locale) === expectedCanonical, path, `${locale} hreflang ${alternates.get(locale) ?? "missing"}`);
    report(alternates.get(locale === "es" ? "en" : "es") === expectedPeer, path, `peer hreflang ${alternates.get(locale === "es" ? "en" : "es") ?? "missing"}`);
    report(alternates.get("x-default") === `${CANONICAL_ORIGIN}${spanishPath}`, path, `x-default ${alternates.get("x-default") ?? "missing"}`);
    report(htmlLang === locale, path, `html lang ${htmlLang ?? "missing"}`);
    report(h1Count === 1, path, `${h1Count} h1 elements`);
    report(attribute(ogUrlTag || "", "content") === expectedCanonical, path, `og:url ${attribute(ogUrlTag || "", "content") ?? "missing"}`);
  }
}

for (const [path, locale] of singleLanguagePages) {
  const response = await fetchPath(path);
  const html = await response.text();
  const canonical = attribute(headLinks(html, "canonical")[0] || "", "href");
  const htmlLang = attribute(html.match(/<html\b[^>]*>/i)?.[0] || "", "lang");
  const h1Count = [...html.matchAll(/<h1\b/gi)].length;
  const ogUrlTag = tags(html, "meta").find((tag) => attribute(tag, "property") === "og:url");
  const expectedCanonical = `${CANONICAL_ORIGIN}${path}`;

  report(response.status === 200, path, `HTTP ${response.status}`);
  report(canonical === expectedCanonical, path, `canonical ${canonical ?? "missing"}`);
  report(htmlLang === locale, path, `html lang ${htmlLang ?? "missing"}`);
  report(h1Count === 1, path, `${h1Count} h1 elements`);
  report(attribute(ogUrlTag || "", "content") === expectedCanonical, path, `og:url ${attribute(ogUrlTag || "", "content") ?? "missing"}`);
}

const spanishHome = await (await fetchPath("/es")).text();
const structuredData = [...spanishHome.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
report(structuredData.some((value) => value.includes('"LocalBusiness"')), "/es", "LocalBusiness JSON-LD");

const robotsResponse = await fetchPath("/robots.txt");
const robotsBody = await robotsResponse.text();
report(robotsResponse.status === 200, "/robots.txt", `HTTP ${robotsResponse.status}`);
report(robotsBody.includes(`Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`), "/robots.txt", "canonical sitemap declaration");

const sitemapResponse = await fetchPath("/sitemap.xml");
const sitemapBody = await sitemapResponse.text();
report(sitemapResponse.status === 200, "/sitemap.xml", `HTTP ${sitemapResponse.status}`);
for (const pair of pagePairs) {
  for (const path of pair) {
    report(sitemapBody.includes(`<loc>${CANONICAL_ORIGIN}${path}</loc>`), "/sitemap.xml", `contains ${path}`);
  }
}
for (const [path] of singleLanguagePages) {
  report(sitemapBody.includes(`<loc>${CANONICAL_ORIGIN}${path}</loc>`), "/sitemap.xml", `contains ${path}`);
}

const rootResponse = await fetchPath("/");
const rootLocation = rootResponse.headers.get("location");
report(rootResponse.status === 308, "/", `HTTP ${rootResponse.status}`);
report(rootLocation ? new URL(rootLocation, CANONICAL_ORIGIN).href === `${CANONICAL_ORIGIN}/es` : false, "/", `redirect ${rootLocation ?? "missing"}`);

const studioResponse = await fetchPath("/studio");
const studioBody = await studioResponse.text();
const studioRobots = tags(studioBody, "meta").find((tag) => attribute(tag, "name") === "robots");
const studioRobotsContent = attribute(studioRobots || "", "content") || studioResponse.headers.get("x-robots-tag") || "";
report(studioResponse.status === 200, "/studio", `HTTP ${studioResponse.status}`);
report(studioRobotsContent.includes("noindex"), "/studio", `robots ${studioRobotsContent || "missing"}`);

for (const [legacyPath, destinationPath] of legacyRedirects) {
  const response = await fetchPath(legacyPath);
  const location = response.headers.get("location");
  const resolvedLocation = location ? new URL(location, CANONICAL_ORIGIN).href : null;
  report(response.status === 308, legacyPath, `HTTP ${response.status}`);
  report(resolvedLocation === `${CANONICAL_ORIGIN}${destinationPath}`, legacyPath, `redirect ${resolvedLocation ?? "missing"}`);
}

console.log(`VERDICT ${failures === 0 ? "GREEN" : "RED"} (${failures} failures)`);
process.exitCode = failures === 0 ? 0 : 1;
