const carritosCtrl = {};
const Carrito = require("../models/carritos");
const producto = require("../models/productos");

carritosCtrl.getProducts = async (req, res) => {
  const products = await producto.find();
  if (products) {
    res.json({ products });
  } else {
    res.json({ mensaje: "No hay productos" });
  }
};

carritosCtrl.getProductsCarrito = async (req, res) => {
  const productsCart = await Carrito.find();

  if (productsCart) {
    res.json({ productsCart });
  } else {
    res.json({ mensaje: "No hay productos en el carrito" });
  }

  //Enviar el mensaje con los productos del carrito (twilio)
};

carritosCtrl.renderCarritos = async (req, res) => {
  const carritos = await Carrito.find().lean();

  /* const client = require("twilio")(process.envTWILIO_ID, process.env.TWILIO_SK);
  client.messages
    .create({
      from: "whatsapp:+14155238886",
      body: `${carritos}`,
      to: `whatsapp: ${process.env.TWILIO_WSPP}`,
    })
    .then((message) => console.log(message.sid));*/
  res.render("carritos/allCarritos", { carritos });
};

carritosCtrl.deleteProductCarrito = async (req, res) => {
  const productoId = req.params.id;

  const productoInCarrito = await Carrito.findById(productoId);

  const { nombre, foto, precio, _id } = await producto.findOne({
    nombre: productoInCarrito.nombre,
  });

  await Carrito.findByIdAndDelete(productoId);

  await producto
    .findByIdAndUpdate(
      _id,
      { inCart: false, nombre, foto, precio },
      { new: true }
    )
    .then((producto) => {
      res.redirect("/carritos");
    })
    .catch((error) => res.json({ mensaje: "Hubo un error" }));
};

carritosCtrl.addProductoCarritoPrueba = async (req, res) => {
  const { _id } = req.params;

  const productoEncontrado = await producto.findOne({ _id });

  const noEstaVacio = _id !== "";

  const estaEnElCarrito = await Carrito.findOne({ _id });

  if (!productoEncontrado) {
    res.status(400).json({
      mensaje: "Este producto no se encuentra en nuestra base de datos",
    });
  } else if (noEstaVacio && !estaEnElCarrito) {
    const newProductInCart = new Carrito({
      nombre: productoEncontrado.nombre,
      _id: productoEncontrado._id,
      stock: productoEncontrado.stock,
      foto: productoEncontrado.foto,
      precio: productoEncontrado.precio,
    });
    newProductInCart.user = req.user.id;

    await producto
      .findByIdAndUpdate(productoEncontrado)
      .then((product) => {
        newProductInCart.save();
        res.redirect("/productos");
      })
      .catch((error) => console.error(error));
  } else if (estaEnElCarrito) {
    res.status(400).json({
      mensaje: "El producto ya esta en el carrito",
    });
  }
};

module.exports = carritosCtrl;
