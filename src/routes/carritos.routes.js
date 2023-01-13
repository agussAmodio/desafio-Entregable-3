const { Router } = require("express");
const router = Router();
const { isAuthenticated } = require("../helpers/auth");

const {
  getProducts,
  getProductsCarrito,
  addProductCarrito,
  deleteProductCarrito,
  renderCarritos,
  addProductoCarritoPrueba,
} = require("../controllers/carritos.controller");

router.get("/get-products", getProducts);

router.get("/products-cart", getProductsCarrito);

router.post("/products-cart/:_id", isAuthenticated, addProductoCarritoPrueba);

router.get("/carritos", isAuthenticated, renderCarritos);

router.delete("/carritos/delete/:id", isAuthenticated, deleteProductCarrito);

module.exports = router;
