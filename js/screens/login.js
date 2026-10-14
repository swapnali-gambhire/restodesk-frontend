const API_URL = "http://localhost:5000/api/auth/login"; // change to your backend URL

const form = document.getElementById("loginForm");
const errorBox = document.getElementById("loginError");
const loginBtn = document.getElementById("loginBtn");

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorBox.hidden = true;

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showError("Please enter your email and password.");
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Signing in...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      showError(data.message || "Invalid email or password.");
      return;
    }

    localStorage.setItem("token", data.token);
    // Change to "dashboard.html" once you add that screen
    alert("Login successful!");
  } catch (err) {
    showError("Cannot reach the server. Please try again.");
  } finally {
    loginBtn.disabled = false;
    loginBtn.textContent = "Sign in";
  }
});