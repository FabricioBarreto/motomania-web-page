document
  .querySelector("#login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        console.log("Datos de usuario recibidos:", user); // Verifica la respuesta
        localStorage.setItem(
          "user",
          JSON.stringify({ name: user.name, points: user.points })
        );
        console.log(
          "Usuario guardado en localStorage:",
          localStorage.getItem("user")
        );
        window.location.href = "beneficios.html";
      } else {
        const error = await response.json();
        console.error("Error en el login:", error); // Verifica el error
        alert(error.error);
      }
    } catch (error) {
      alert("Error al iniciar sesión. Inténtalo más tarde.");
      console.error(error);
    }
  });
