export function initLogin() {
  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = "dashboard.html";   // go straight to the dashboard
  });
}