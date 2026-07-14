const required = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
];

const missing = required.filter((key) => !process.env[key]?.trim());

if (missing.length) {
  console.error(`Sanity is not connected yet. Missing: ${missing.join(", ")}`);
  console.error("This is expected until the dedicated account/project is created.");
  process.exitCode = 1;
} else {
  console.log("Sanity project configuration is present.");
}
