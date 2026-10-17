

import { initLogin } from "./screens/login.js";
import { initDashboard } from "./screens/dashboard.js";
import { initMenu } from "./screens/menu.js";
import { initOrder } from "./screens/order.js";
// import { initSettings } from "./screens/settings.js";   // add when you create it

/* ---------- Screen registry: page name -> init function ---------- */
const screens = {
  login: initLogin,
  dashboard: initDashboard,
  menu: initMenu,
  order: initOrder,
  // settings: initSettings,
};

/* ---------- Start the app ---------- */
function startApp() {
  const page = document.body.dataset.page;

  if (!page) {
    console.error('main.js: <body> is missing the data-page attribute.');
    return;
  }

  const init = screens[page];

  if (!init) {
    console.error(`main.js: no screen registered for "${page}".`);
    return;
  }

  try {
    init();
  } catch (err) {
    console.error(`main.js: failed to initialise "${page}" screen`, err);
  }
}

/* Modules are deferred, but this keeps it safe in every case */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startApp);
} else {
  startApp();
}