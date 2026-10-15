/* Build the tables list (replace with your real data) */
const tablesData = [
  { no: 1, status: "free" },
  { no: 2, status: "occupied" },
  { no: 3, status: "reserved" },
  { no: 4, status: "free" },
  { no: 5, status: "occupied" },
  { no: 6, status: "free" }
];

const tablesSubmenu = document.getElementById("tablesSubmenu");

tablesSubmenu.innerHTML = tablesData.map(t => `
  <a href="#" class="nav-link sub-link" data-view="tables" data-table="${t.no}">
    <span class="dot ${t.status === "free" ? "" : t.status}"></span>
    Table ${t.no}
    <span class="status">${t.status}</span>
  </a>
`).join("");

/* Select a table */
tablesSubmenu.addEventListener("click", (e) => {
  const link = e.target.closest("[data-table]");
  if (!link) return;
  e.preventDefault();

  tablesSubmenu.querySelectorAll(".sub-link").forEach(l => l.classList.remove("active"));
  link.classList.add("active");

  const tableNo = link.dataset.table;
  console.log("Selected table:", tableNo);   // e.g. showTable(tableNo)
});