async function loadSettings() {
  // Read .env text (terminal or browser)
  const text =
    typeof window === "undefined"
      ? require("fs").readFileSync(__dirname + "/../.env", "utf8")
      : await (await fetch("/.env")).text();

  // Parse KEY=VALUE lines
  const env = {};
  text.split("\n").forEach((line) => {
    const [key, ...val] = line.trim().split("=");
    if (key && !key.startsWith("#")) env[key] = val.join("=").trim();
  });

  const ENV = env.ENVIRONMENT || "dev";
  const BASE_URLS = {
    dev: env.BASE_URL_DEV,
    preprod: env.BASE_URL_PREPROD,
    prod: env.BASE_URL_PROD,
  };
  const BASE_URL = BASE_URLS[ENV];

  console.log("Environment:", ENV);
  console.log("ALL BASE_URLS:", BASE_URLS);
  console.log("ACTIVE BASE_URL:", BASE_URL);

  return { ENV, BASE_URLS, BASE_URL };
}

if (typeof window === "undefined") {
  loadSettings(); // terminal
} else {
  window.SETTINGS_READY = loadSettings().then((s) => (window.SETTINGS = s)); // browser
}