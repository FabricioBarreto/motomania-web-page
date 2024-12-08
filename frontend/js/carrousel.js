document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const items = carousel.querySelectorAll(".item");
  const intervalTime = 3500;
  let currentIndex = 0;
  let autoCarousel;

  function showItem(index) {
    items.forEach((item, idx) => {
      item.classList.toggle("active", idx === index);
    });
  }

  function showNextItem() {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  }

  function showPreviousItem() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
  }

  function startCarousel() {
    autoCarousel = setInterval(showNextItem, intervalTime);
  }

  function stopCarousel() {
    clearInterval(autoCarousel);
  }

  document.querySelector(".next").addEventListener("click", () => {
    stopCarousel();
    showNextItem();
    startCarousel();
  });

  document.querySelector(".prev").addEventListener("click", () => {
    stopCarousel();
    showPreviousItem();
    startCarousel();
  });

  startCarousel();
});
