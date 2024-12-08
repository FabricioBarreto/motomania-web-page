document.getElementById("logout-btn").addEventListener("click", () => {
  localStorage.removeItem("user");
  location.reload();
});
