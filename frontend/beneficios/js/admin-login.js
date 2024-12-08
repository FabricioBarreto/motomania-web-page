document
  .querySelector("#admin-login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("admin-username").value.trim();
    const password = document.getElementById("admin-password").value.trim();


    try {
      const response = await fetch("http://127.0.0.1:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        window.location.href = "/frontend/beneficios/admin.html";
      } else {
        const error = await response.json();
        document.getElementById("error-message").textContent = error.error;
      }
    } catch (err) {
      document.getElementById("error-message").textContent =
        "Error al intentar iniciar sesión.";
    }
  });
