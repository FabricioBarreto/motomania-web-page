document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://127.0.0.1:3000/check-admin-auth", {
      method: "GET",
      credentials: "include", // Incluir cookies para mantener la sesión
    });

    if (response.status === 200) {
      console.log("Usuario autenticado"); // Mensaje de depuración
    } else {
      // Redirigir al login si el usuario no está autenticado
      window.location.href = "/frontend/beneficios/admin-login.html";
    }
  } catch (err) {
    console.error("Error al verificar autenticación:", err);
    window.location.href = "/frontend/beneficios/admin-login.html"; // Redirigir al login si ocurre un error
  }
});

// Evento para manejar el cierre de sesión
document.getElementById("logout-btn").addEventListener("click", async () => {
  try {
    const response = await fetch("http://127.0.0.1:3000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "/frontend/beneficios/admin-login.html";
    } else {
      console.error("Error al cerrar sesión.");
    }
  } catch (err) {
    console.error("Error al cerrar sesión:", err);
  }
});
