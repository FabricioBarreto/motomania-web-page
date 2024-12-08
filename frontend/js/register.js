document
  .querySelector("#register-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const lastname = document.getElementById("register-lastname").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const dni = document.getElementById("register-dni").value.trim();
    const password = document.getElementById("register-password").value.trim();
    const confirmPassword = document
      .getElementById("register-password-confirm")
      .value.trim();

    const errorMessage = document.getElementById("error-message");
    errorMessage.textContent = "";

    if (!name || !lastname || !email || !dni || !password || !confirmPassword) {
      errorMessage.textContent = "Por favor, completa todos los campos.";
      return;
    }

    if (password !== confirmPassword) {
      errorMessage.textContent = "Las contraseñas no coinciden.";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastname, email, dni, password }),
      });

      if (response.ok) {
        window.location.href = "login.html";
      } else {
        const error = await response.json();
        errorMessage.textContent = error.error || "Error desconocido.";
      }
    } catch (error) {
      errorMessage.textContent =
        "Error al registrar el usuario. Inténtalo más tarde.";
      console.error(error);
    }
  });
