import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const projectDirectory = resolve(scriptDirectory, "..");
const outputDirectory = join(projectDirectory, "brand", "logo-refresh");
const temporaryDirectory = join(outputDirectory, ".build");

const colors = {
  atlantic: "#075D7A",
  atlanticDeep: "#073B4C",
  solar: "#F4A700",
};

mkdirSync(temporaryDirectory, { recursive: true });

function createOutlinedWordmark({
  id,
  topColor = colors.solar,
  bottomColor = colors.atlanticDeep,
  topSize = 42,
  bottomSize = 70,
  topTracking = 3600,
  bottomTracking = 1500,
}) {
  const temporarySvg = join(temporaryDirectory, `${id}.svg`);
  const markup = [
    `<span font_desc="Avenir Next Condensed Demi Bold ${topSize}" foreground="${topColor}" letter_spacing="${topTracking}">LAS PALMAS</span>`,
    `<span font_desc="Avenir Next Condensed Bold ${bottomSize}" foreground="${bottomColor}" letter_spacing="${bottomTracking}">BUSINESS CENTER</span>`,
  ].join("\n");

  const result = spawnSync(
    "pango-view",
    [
      "--no-display",
      `--output=${temporarySvg}`,
      "--background=transparent",
      "--margin=0",
      "--line-spacing=0.78",
      "--markup",
      `--text=${markup}`,
    ],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    throw new Error(result.stderr || `Unable to outline wordmark ${id}.`);
  }

  const source = readFileSync(temporarySvg, "utf8");
  const dimensions = source.match(
    /width="([\d.]+)" height="([\d.]+)" viewBox="0 0 ([\d.]+) ([\d.]+)"/,
  );
  const content = source.match(/<svg[^>]*>([\s\S]*)<\/svg>/);

  if (!dimensions || !content) {
    throw new Error(`Unable to parse outlined wordmark ${id}.`);
  }

  return {
    width: Number(dimensions[3]),
    height: Number(dimensions[4]),
    content: content[1]
      .replaceAll("glyph-", `${id}-glyph-`)
      .replaceAll("source-", `${id}-source-`)
      .replaceAll("mask-", `${id}-mask-`),
  };
}

function wordmarkGroup(wordmark, { x, y, width }) {
  const scale = width / wordmark.width;
  return `<g transform="translate(${x} ${y}) scale(${scale})">${wordmark.content}</g>`;
}

function svgDocument({ title, description, symbol, wordmark, wordmarkLayout }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1200 360" role="img" aria-labelledby="title description">
  <title id="title">${title}</title>
  <desc id="description">${description}</desc>
  <g id="symbol">${symbol}</g>
  <g id="outlined-wordmark">${wordmarkGroup(wordmark, wordmarkLayout)}</g>
</svg>
`;
}

const primaryWordmark = createOutlinedWordmark({
  id: "coastal-arc",
  topSize: 40,
  bottomSize: 72,
  topTracking: 4100,
  bottomTracking: 1650,
});

const compactWordmark = createOutlinedWordmark({
  id: "lp-horizon",
  topSize: 38,
  bottomSize: 67,
  topTracking: 3500,
  bottomTracking: 1150,
});

const openWordmark = createOutlinedWordmark({
  id: "open-pavilion",
  topColor: colors.atlantic,
  bottomColor: colors.atlanticDeep,
  topSize: 38,
  bottomSize: 68,
  topTracking: 4100,
  bottomTracking: 1800,
});

const ringWordmark = createOutlinedWordmark({
  id: "solar-ring",
  topColor: colors.solar,
  bottomColor: colors.atlantic,
  topSize: 39,
  bottomSize: 69,
  topTracking: 3900,
  bottomTracking: 1450,
});

const designs = [
  {
    filename: "las-palmas-business-center-logo.svg",
    title: "Las Palmas Business Center — Coastal Arc",
    description:
      "Recommended modern identity: an Atlantic blue architectural arc framing a golden sunrise, paired with a custom outlined wordmark.",
    wordmark: primaryWordmark,
    wordmarkLayout: { x: 358, y: 96, width: 760 },
    symbol: `
    <g transform="translate(43 25)">
      <path d="M62 282C66 151 155 56 282 36L294 84C194 101 124 177 119 282Z" fill="${colors.atlantic}"/>
      <path d="M119 272C128 195 189 147 269 154L260 204C213 201 176 230 169 276Z" fill="${colors.solar}"/>
      <path d="M108 272H306V290H108Z" fill="${colors.atlanticDeep}"/>
      <path d="M282 36L309 44L297 106L252 97Z" fill="${colors.atlantic}"/>
    </g>`,
  },
  {
    filename: "alternate-01-lp-horizon.svg",
    title: "Las Palmas Business Center — LP Horizon",
    description:
      "A compact LP monogram crossed by a golden horizon, designed for signage, social avatars, and small digital applications.",
    wordmark: compactWordmark,
    wordmarkLayout: { x: 372, y: 101, width: 728 },
    symbol: `
    <g transform="translate(60 45)">
      <circle cx="202" cy="132" r="43" fill="${colors.solar}"/>
      <path d="M30 22H60V208H116V238H30Z" fill="${colors.atlanticDeep}"/>
      <path fill-rule="evenodd" d="M134 22H194C235 22 260 45 260 82C260 120 235 143 194 143H164V238H134ZM164 52V113H191C216 113 230 103 230 82C230 62 216 52 191 52Z" fill="${colors.atlantic}"/>
      <path d="M18 172H264V190H18Z" fill="${colors.solar}"/>
      <path d="M134 172H264V190H134Z" fill="${colors.atlanticDeep}"/>
    </g>`,
  },
  {
    filename: "alternate-02-open-pavilion.svg",
    title: "Las Palmas Business Center — Open Pavilion",
    description:
      "An open architectural pavilion containing a golden sun, expressing welcome, place, and contemporary workspace.",
    wordmark: openWordmark,
    wordmarkLayout: { x: 376, y: 101, width: 724 },
    symbol: `
    <g transform="translate(58 42)">
      <circle cx="142" cy="152" r="57" fill="${colors.solar}"/>
      <path d="M26 87L142 15L258 87L244 110L142 46L40 110Z" fill="${colors.atlantic}"/>
      <path d="M43 104H65V246H43ZM219 104H241V246H219Z" fill="${colors.atlanticDeep}"/>
      <path d="M43 188H241V204H43Z" fill="${colors.atlanticDeep}"/>
      <path d="M104 246V174H180V246" fill="${colors.atlanticDeep}"/>
    </g>`,
  },
  {
    filename: "alternate-03-solar-ring.svg",
    title: "Las Palmas Business Center — Solar Ring",
    description:
      "A circular modern seal combining a rising sun, horizon, and office skyline for a confident standalone symbol.",
    wordmark: ringWordmark,
    wordmarkLayout: { x: 376, y: 101, width: 728 },
    symbol: `
    <g transform="translate(61 39)">
      <path fill-rule="evenodd" d="M140 20A120 120 0 1 1 140 260A120 120 0 1 1 140 20ZM140 44A96 96 0 1 0 140 236A96 96 0 1 0 140 44Z" fill="${colors.atlantic}"/>
      <path d="M64 169A76 76 0 0 1 216 169Z" fill="${colors.solar}"/>
      <path d="M54 162H226V177H54Z" fill="${colors.atlanticDeep}"/>
      <path d="M85 169H103V218H85ZM131 169H149V238H131ZM177 169H195V206H177Z" fill="${colors.atlantic}"/>
    </g>`,
  },
];

for (const design of designs) {
  writeFileSync(
    join(outputDirectory, design.filename),
    svgDocument(design),
    "utf8",
  );
}

writeFileSync(
  join(outputDirectory, "manifest.json"),
  `${JSON.stringify(
    {
      name: "Las Palmas Business Center logo refresh",
      recommended: "las-palmas-business-center-logo.svg",
      exports: designs.map(({ filename, title, description }) => ({
        filename,
        preview: `previews/${filename.replace(/\.svg$/, ".png")}`,
        title,
        description,
        format: "SVG 1.1",
        viewBox: "0 0 1200 360",
        background: "transparent",
        typography: "outlined vector paths",
      })),
      palette: colors,
      sourceReference: "/Users/martin/Desktop/logo_business_center.png",
    },
    null,
    2,
  )}\n`,
  "utf8",
);

rmSync(temporaryDirectory, { recursive: true, force: true });

console.log(`Built ${designs.length} outlined SVG logo directions in ${outputDirectory}`);
