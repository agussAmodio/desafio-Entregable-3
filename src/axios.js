const axios = require("axios");

const api = axios.create({
  baseURL: "https://desafio-entregable-3-production.up.railway.app/",
});

//PRUEBAS PRODUCTOS

try {
  const data = await api.get("/productos");
  console.log(data.data);
} catch (e) {
  console.log(e);
}

try {
  const dataPost = await api.post("/productos/nuevoProducto", {
    nombre: "teclado redragon k2",
    descripcion: "perisferico teclado",
    id: 233,
    codigo: 6562626,
    foto: "www.redragon.com.ar",
    precio: 23456,
    stock: 32,
  });
  console.log(dataPost.data);
} catch (e) {
  console.log(e);
}

try {
  const dataDelete = await api.delete(
    "/productos/delete/63daa9b0fb4bbeb7996ff71b"
  );
  console.log(dataDelete.data);
} catch (e) {
  console.log(e);
}

//PRUEBAS CARRITO

try {
  const dataProductosCarrito = await api.get("/get-products");
  console.log(dataProductosCarrito.data);
} catch (e) {
  console.log(e);
}

try {
  const dataProductosCarritoo = await api.get("/products-cart");
  console.log(dataProductosCarritoo.data);
} catch (e) {
  console.log(e);
}

try {
  const dataDeleteCarrito = await api.delete("/carritos/delete/:id");
  console.log(dataDeleteCarrito.data);
} catch (e) {
  console.log(e);
}

try {
  const dataCarritos = await api.get("/carritos");
  console.log(dataCarritos.data);
} catch (e) {
  console.log(e);
}
