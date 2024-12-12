document
  .querySelector("#login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const identifier = document.getElementById("login-identifier").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!identifier || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/auth/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier, password }),
      });

      if (response.ok) {
        const user = await response.json();
        localStorage.setItem(
          "user",
          JSON.stringify({ name: user.name, points: user.points })
        );
        window.location.href = "beneficios.html";
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al iniciar sesión. Inténtalo más tarde.");
    }
  });
