document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  if (currentUser) {
    const userNameElement = document.getElementById("name");
    const userPointsElement = document.getElementById("points");

    if (userNameElement) {
      userNameElement.textContent = currentUser.name;
    }
    if (userPointsElement) {
      userPointsElement.textContent = currentUser.points;
    }

    document.querySelector(".user-data").style.display = "flex";
    document.querySelector(".login-register").style.display = "none";

  } else {
    console.log("No hay usuario en localStorage.");
  }
});

// Asocia eventos de clic a cada sección
document.getElementById("sorteos").addEventListener("click", function () {
  manejarSeccion("sorteos");
});

document.getElementById("descuentos").addEventListener("click", function () {
  manejarSeccion("descuentos");
});

document.getElementById("promociones").addEventListener("click", function () {
  manejarSeccion("promociones");
});

// Función principal para manejar la sección seleccionada
function manejarSeccion(seccion) {
  // Oculta la sección principal
  document.querySelector(".beneficios-container").style.display = "none";

  // Muestra la sección de las tarjetas
  document.querySelector(".section-beneficios-cards").style.display = "flex";

  // Llama a la función para cargar y renderizar los datos
  cargarDatos(seccion);
}

function cargarDatos(seccion) {
  const urlJSON = "./beneficios.json"; // Ruta al archivo JSON

  fetch(urlJSON)
    .then((response) => response.json())
    .then((data) => {
      const items = data[seccion];

      const container = document.querySelector(".beneficios-cards");
      container.innerHTML = ""; 
      items.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h3");
        title.classList.add("card-title");
        title.textContent = item.title;

        const description = document.createElement("p");
        description.classList.add("card-description");
        description.textContent = item.description;

        const points = document.createElement("span");
        points.classList.add("card-neededPoints");
        points.innerHTML = `<img src="./img/star.png" alt="point-star" width="18"> ${item.neededPoint}`;
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(points);

        container.appendChild(card);

        setTimeout(() => {
          card.classList.add("show");
        }, index * 200); 
      });
    })
    .catch((error) => {
      console.error("Error cargando los datos:", error);
    });
}

document
  .getElementById("back-cards-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(".beneficios-container").style.display = "block";
    document.querySelector(".section-beneficios-cards").style.display = "none";
  });
