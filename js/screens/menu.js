/* =========================================================
   menu.js
   ========================================================= */

export function initMenu() {

  /* Replace with your real data / API */
  const menuData = [
    { id: 1, name: "Paneer Tikka",    category: "Starters", price: 220, veg: true,  available: true },
    { id: 2, name: "Chicken 65",      category: "Starters", price: 260, veg: false, available: true },
    { id: 3, name: "Butter Chicken",  category: "Mains",    price: 340, veg: false, available: true },
    { id: 4, name: "Dal Makhani",     category: "Mains",    price: 240, veg: true,  available: true },
    { id: 5, name: "Veg Biryani",     category: "Mains",    price: 260, veg: true,  available: false },
    { id: 6, name: "Gulab Jamun",     category: "Desserts", price: 90,  veg: true,  available: true },
    { id: 7, name: "Masala Chai",     category: "Drinks",   price: 40,  veg: true,  available: true },
    { id: 8, name: "Fresh Lime Soda", category: "Drinks",   price: 70,  veg: true,  available: true }
  ];

  const menuGrid     = document.getElementById("menuGrid");
  const menuMeta     = document.getElementById("menuMeta");
  const menuSearch   = document.getElementById("menuSearch");
  const categoryTabs = document.getElementById("categoryTabs");

  const categories = ["All", ...new Set(menuData.map(i => i.category))];
  let activeCategory = "All";
  let searchText = "";

  /* ---------- Category tabs ---------- */
  function renderTabs() {
    categoryTabs.innerHTML = categories.map(c => `
      <button type="button" class="category-tab ${c === activeCategory ? "active" : ""}"
              data-category="${c}">${c}</button>
    `).join("");
  }

  /* ---------- Menu cards ---------- */
  function renderMenu() {
    const items = menuData.filter(i =>
      (activeCategory === "All" || i.category === activeCategory) &&
      i.name.toLowerCase().includes(searchText)
    );

    menuMeta.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;

    if (!items.length) {
      menuGrid.innerHTML = `<div class="empty-state">No dishes found.</div>`;
      return;
    }

    menuGrid.innerHTML = items.map(i => `
      <div class="menu-card ${i.available ? "" : "unavailable"}">
        <div class="menu-card-top">
          <span class="category">${i.category}</span>
          <span class="veg-dot ${i.veg ? "veg" : ""}" title="${i.veg ? "Veg" : "Non-veg"}"></span>
        </div>
        <h3>${i.name}</h3>
        <span class="price">₹${i.price}</span>
        <button type="button" class="toggle-btn" data-id="${i.id}">
          ${i.available ? "Available" : "Unavailable"}
        </button>
      </div>
    `).join("");
  }

  /* ---------- Events ---------- */
  categoryTabs.addEventListener("click", (e) => {
    const tab = e.target.closest("[data-category]");
    if (!tab) return;
    activeCategory = tab.dataset.category;
    renderTabs();
    renderMenu();
  });

  menuSearch.addEventListener("input", () => {
    searchText = menuSearch.value.trim().toLowerCase();
    renderMenu();
  });

  menuGrid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-id]");
    if (!btn) return;
    const item = menuData.find(i => i.id === Number(btn.dataset.id));
    item.available = !item.available;
    renderMenu();
  });

  /* Sidebar dropdown toggle */
  document.querySelectorAll("[data-toggle]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.toggle);
      const open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      target.hidden = open;
    });
  });

  /* ---------- Init ---------- */
  renderTabs();
  renderMenu();
}