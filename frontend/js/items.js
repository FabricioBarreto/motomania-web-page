document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("#list tbody");
  const itemsPerPage = 100;
  let currentPage = 1;
  let itemsData = [];
  let filteredItems = []; // Variable para almacenar los elementos filtrados

  // Función para renderizar productos de la página actual
  const renderItems = () => {
    tableBody.innerHTML = ""; // Limpiamos la tabla para los nuevos elementos
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredItems.slice(start, end); // Usamos filteredItems

    pageItems.forEach((item, index) => {
      const row = document.createElement("tr");
      row.classList.add("itemsTable");

      const nameCell = document.createElement("td");
      nameCell.textContent = item.name;
      nameCell.classList.add("producto", "productItem");

      const actionCell = document.createElement("td");
      const button = document.createElement("button");
      button.textContent = "Consultar";
      button.dataset.index = index + start; // Ajustamos el índice para la página
      actionCell.classList.add("consulta");
      actionCell.appendChild(button);

      button.onclick = () => {
        const encodedProductName = encodeURIComponent(item.name);
        const phoneNumber = "+543624526860";
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hola,%20quiero%20consultar%20sobre%20el%20producto%20${encodedProductName}`;
        window.open(whatsappUrl, "_blank");
      };

      row.appendChild(nameCell);
      row.appendChild(actionCell);
      tableBody.appendChild(row);
    });

    updatePaginationControls(); // Actualizamos los controles después de renderizar
  };

  // Función para actualizar los controles de paginación
  const updatePaginationControls = () => {
    const paginationContainer = document.querySelector("#pagination-controls");
    paginationContainer.innerHTML = "";

    const prevButton = document.createElement("button");
    prevButton.textContent = "Anterior";
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => {
      currentPage--;
      renderItems();
    };

    const nextButton = document.createElement("button");
    nextButton.textContent = "Siguiente";
    nextButton.disabled =
      currentPage === Math.ceil(filteredItems.length / itemsPerPage);
    nextButton.onclick = () => {
      currentPage++;
      renderItems();
    };

    paginationContainer.appendChild(prevButton);
    paginationContainer.appendChild(nextButton);
  };

  // Función de búsqueda
  function search() {
    const input = document.getElementById("searchbar").value.toLowerCase();
    // Filtrar los productos basados en el input
    filteredItems = itemsData.filter((item) =>
      item.name.toLowerCase().includes(input)
    );
    currentPage = 1; // Reseteamos a la primera página
    renderItems(); // Renderizamos los elementos filtrados
  }

  try {
    let storedData = localStorage.getItem("itemsData");
    if (storedData) {
      itemsData = JSON.parse(storedData).items;
    } else {
      const response = await fetch("./../items.json");
      if (!response.ok) {
        throw new Error("Error al cargar el archivo JSON");
      }
      const data = await response.json();
      itemsData = data.items;

      localStorage.setItem("itemsData", JSON.stringify({ items: itemsData }));
    }

    // Inicializar filteredItems con todos los items
    filteredItems = itemsData;
    renderItems(); // Renderizamos la primera página de todos los items
  } catch (error) {
    console.error("Error al cargar los datos del JSON:", error);
  }

  // Añadir el evento de búsqueda al input
  document.getElementById("searchbar").addEventListener("keyup", search);
});
