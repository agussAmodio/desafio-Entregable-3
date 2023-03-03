botonFinalizar.addEventListener("click", async () => {
  const res = await fetch("/finalizarCompra", {
    method: "POST",
  });

  window.location.href = "http://localhost:8080/carritos";
});
