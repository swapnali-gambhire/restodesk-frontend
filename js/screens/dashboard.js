/* =========================================================
   dashboard.js
   ========================================================= */

/* Build the tables list (replace with your real data / API) */
const tablesData = [
  { no: 1, seats: 2, status: "free" },
  { no: 2, seats: 4, status: "occupied" },
  { no: 3, seats: 4, status: "reserved" },
  { no: 4, seats: 2, status: "free" },
  { no: 5, seats: 6, status: "occupied" },
  { no: 6, seats: 2, status: "free" }
];

const tablesSubmenu = document.getElementById("tablesSubmenu");
const overviewMenu  = document.getElementById("overviewMenu");
const tableTitle    = document.getElementById("tableTitle");
const tableMeta     = document.getElementById("tableMeta");
const statusActions = document.getElementById("statusActions");

let selectedNo = tablesData[0].no;

/* ---------- Render the sidebar tables list ---------- */
function renderTables() {
  tablesSubmenu.innerHTML = tablesData.map(t => `
    <a href="#" class="nav-link sub-link ${t.no === selectedNo ? "active" : ""}"
       data-view="tables" data-table="${t.no}">
      <span class="dot ${t.status === "free" ? "" : t.status}"></span>
      Table ${t.no}
      <span class="status">${t.status}</span>
    </a>
  `).join("");
}

/* ---------- Render the main panel for the selected table ---------- */
function showTable(no) {
  const t = tablesData.find(x => x.no === Number(no));
  if (!t) return;
  selectedNo = t.no;

  tableTitle.textContent = `Table ${t.no}`;
  tableMeta.textContent  = `${t.seats} seats · ${t.status.charAt(0).toUpperCase() + t.status.slice(1)}`;

  statusActions.querySelectorAll(".status-btn").forEach(b => {
    b.classList.toggle("current", b.dataset.status === t.status);
  });

  renderTables();
}

/* ---------- Select a table ---------- */
tablesSubmenu.addEventListener("click", (e) => {
  const link = e.target.closest("[data-table]");
  if (!link) return;
  e.preventDefault();
  showTable(link.dataset.table);
});

/* ---------- Change status ---------- */
statusActions.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-status]");
  if (!btn) return;
  const t = tablesData.find(x => x.no === selectedNo);
  t.status = btn.dataset.status;
  showTable(selectedNo);
});

/* ---------- Dropdown toggles (Overview, Tables) ---------- */
document.querySelectorAll("[data-toggle]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = document.getElementById(btn.dataset.toggle);
    const open = btn.getAttribute("aria-expanded") === "true";
    btn.setAttribute("aria-expanded", String(!open));
    target.hidden = open;
  });
});

/* ---------- Init ---------- */
showTable(selectedNo);