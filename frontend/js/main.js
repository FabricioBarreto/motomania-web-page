// Obtener el año actual
const currentYear = new Date().getFullYear();

// Insertar el año actual en el elemento con la clase 'date'
document.querySelector(".date").textContent = currentYear;

// Definir la función toggleMenu
function toggleMenu() {
  const navMenu = document.querySelector(".nav-menu");
  navMenu.style.display = navMenu.style.display === "block" ? "none" : "block";
}

// Agregar evento de clic al botón para alternar el menú
document.querySelector(".toggle-btn").addEventListener("click", toggleMenu);

// Función para ajustar el display del menú cuando se redimensiona la ventana
function resizeMenu() {
  const navMenu = document.querySelector(".nav-menu");
  if (window.innerWidth > 1000) {
    navMenu.style.display = "block"; // Mostrar el menú en pantallas grandes
  } else {
    navMenu.style.display = "none"; // Ocultar el menú en pantallas pequeñas
  }
}

// Ejecutar la función al cargar la página y cada vez que se redimensione la ventana
window.addEventListener("resize", resizeMenu);
resizeMenu(); // Ejecutar la función al cargar la página
