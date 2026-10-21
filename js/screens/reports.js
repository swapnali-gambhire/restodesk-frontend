export function initReports() {
  const inr = (n) => "₹" + n.toLocaleString("en-IN");

  // Dummy data (replace with API later)
  const ranges = {
    today: {
      meta: "Today",
      labels: ["10am", "12pm", "2pm", "4pm", "6pm", "8pm", "10pm"],
      sales:  [1200, 3400, 2100, 1500, 4200, 7800, 5300],
      stats: [
        { label: "Revenue",    value: inr(25500), delta: "+8.2%", up: true },
        { label: "Orders",     value: "62",       delta: "+5.1%", up: true },
        { label: "Avg. order", value: inr(411),   delta: "-1.4%", up: false },
        { label: "Tables used", value: "6",       delta: "same",  up: true }
      ]
    },
    week: {
      meta: "Last 7 days",
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      sales:  [18200, 15400, 17800, 21000, 29500, 38200, 33400],
      stats: [
        { label: "Revenue",    value: inr(173500), delta: "+12.4%", up: true },
        { label: "Orders",     value: "428",       delta: "+9.7%",  up: true },
        { label: "Avg. order", value: inr(405),    delta: "+2.3%",  up: true },
        { label: "Tables used", value: "6",        delta: "same",   up: true }
      ]
    },
    month: {
      meta: "Last 30 days",
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      sales:  [152000, 168500, 161200, 189400],
      stats: [
        { label: "Revenue",    value: inr(671100), delta: "+15.8%", up: true },
        { label: "Orders",     value: "1,684",     delta: "+11.2%", up: true },
        { label: "Avg. order", value: inr(398),    delta: "+3.9%",  up: true },
        { label: "Tables used", value: "6",        delta: "same",   up: true }
      ]
    }
  };

  const topItems = [
    { name: "Butter Naan",    sold: 210 },
    { name: "Masala Chai",    sold: 175 },
    { name: "Butter Chicken", sold: 124 },
    { name: "Paneer Tikka",   sold: 98 },
    { name: "Veg Biryani",    sold: 86 }
  ];

  const orders = [
    { id: "#1048", table: "Table 3", status: "paid",      amount: 450 },
    { id: "#1047", table: "Table 1", status: "paid",      amount: 290 },
    { id: "#1046", table: "Table 5", status: "pending",   amount: 520 },
    { id: "#1045", table: "Table 2", status: "paid",      amount: 600 },
    { id: "#1044", table: "Table 6", status: "cancelled", amount: 480 }
  ];

  // Elements
  const metaEl   = document.getElementById("rpMeta");
  const statsEl  = document.getElementById("rpStats");
  const barsEl   = document.getElementById("rpBars");
  const itemsEl  = document.getElementById("rpItems");
  const ordersEl = document.getElementById("rpOrders");
  const rangeEl  = document.getElementById("rpRange");

  // Parts that change with the date range
  function renderRange(key) {
    const r = ranges[key];
    metaEl.textContent = "Sales overview · " + r.meta;

    statsEl.innerHTML = r.stats.map(s => `
      <div class="rp-stat">
        <span>${s.label}</span>
        <b>${s.value}</b>
        <small class="${s.up ? "up" : "down"}">${s.delta}</small>
      </div>
    `).join("");

    const max = Math.max(...r.sales);
    barsEl.innerHTML = r.sales.map((v, i) => `
      <div class="rp-col">
        <div class="rp-bar ${v === max ? "peak" : ""}"
             style="height:${(v / max) * 85}%"
             data-value="${inr(v)}"></div>
        ${r.labels[i]}
      </div>
    `).join("");
  }

  // Top items
  function renderItems() {
    const max = Math.max(...topItems.map(i => i.sold));
    itemsEl.innerHTML = topItems.map(i => `
      <li>
        <div class="rp-item-top"><b>${i.name}</b><span>${i.sold} sold</span></div>
        <div class="rp-track"><div class="rp-fill" style="width:${(i.sold / max) * 100}%"></div></div>
      </li>
    `).join("");
  }

  // Recent orders
  function renderOrders() {
    ordersEl.innerHTML = orders.map(o => `
      <tr>
        <td><b>${o.id}</b></td>
        <td>${o.table}</td>
        <td><span class="rp-badge ${o.status}">${o.status[0].toUpperCase() + o.status.slice(1)}</span></td>
        <td class="r">${inr(o.amount)}</td>
      </tr>
    `).join("");
  }

  // Range buttons
  rangeEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-range]");
    if (!btn) return;
    rangeEl.querySelectorAll("button").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderRange(btn.dataset.range);
  });

  // Init
  renderRange("week");
  renderItems();
  renderOrders();
}