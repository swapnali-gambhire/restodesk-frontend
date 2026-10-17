export function initOrder() {
  const menu = [
    { id: 1, name: "Paneer Tikka",   price: 240 },
    { id: 2, name: "Butter Chicken", price: 340 },
    { id: 3, name: "Veg Biryani",    price: 260 },
    { id: 4, name: "Butter Naan",    price: 55 },
    { id: 5, name: "Masala Chai",    price: 50 }
  ];

  let order = {}; // { id: qty }

  const menuList  = document.getElementById("menuList");
  const orderList = document.getElementById("orderList");
  const totalEl   = document.getElementById("total");
  const placeBtn  = document.getElementById("placeBtn");

  function renderMenu() {
    menuList.innerHTML = menu.map(m => `
      <div class="item">
        <span>${m.name} – ₹${m.price}</span>
        <button data-id="${m.id}">Add</button>
      </div>
    `).join("");
  }

  function renderOrder() {
    let total = 0;

    orderList.innerHTML = Object.entries(order).map(([id, qty]) => {
      const item = menu.find(m => m.id == id);
      total += item.price * qty;
      return `<li><span>${qty} × ${item.name}</span><span>₹${item.price * qty}</span></li>`;
    }).join("");

    totalEl.textContent = "₹" + total;
  }

  menuList.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;
    const id = btn.dataset.id;
    order[id] = (order[id] || 0) + 1;
    renderOrder();
  });

  placeBtn.addEventListener("click", () => {
    if (!Object.keys(order).length) return alert("Add some items first");
    alert("Order placed!");
    order = {};
    renderOrder();
  });

  renderMenu();
  renderOrder();
}