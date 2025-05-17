// Selecciona los botones y el menú
const botonAdd = document.getElementById("add");
const botonList = document.getElementById("list");

// Agrega un evento al botón "list" para mostrar/ocultar el menú
botonList.addEventListener("click", () => {
  alert("funciona list");
});

// Opcional: funcionalidad para el botón "add"
botonAdd.addEventListener("click", () => {
  alert("funciona add");
});
