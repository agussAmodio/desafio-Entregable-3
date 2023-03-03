import nodemailer from "nodemailer";
import Carrito from "../models/carritos.js";
import Producto from "../models/productos.js";
import Ordenes from "../models/ordenes.js";

const carritosCtrl = {};

carritosCtrl.renderCarritos = async (req, res) => {
  const carrito = await Carrito.findOne().lean();
  const productosDelCarrito = carrito ? carrito.productos : [];

  return res
    .status(200)
    .render("carritos/allCarritos", { productosDelCarrito });
};

carritosCtrl.deleteProductCarrito = async (req, res) => {
  const productoId = req.params.id;
  const carrito = await Carrito.findOne();
  const productosDelCarrito = carrito.productos;

  const indiceProducto = productosDelCarrito.findIndex(
    (producto) => producto.id === productoId
  );

  if (indiceProducto === -1) {
    return res
      .status(404)
      .json({ mensaje: "El producto no se encuentra en el carrito" });
  }
  productosDelCarrito.splice(indiceProducto, 1);

  const resultado = await Carrito.updateOne(
    {},
    { productos: productosDelCarrito }
  );

  if (resultado.modifiedCount > 0) {
    return res.status(200).redirect("http://localhost:8080/carritos");
  }

  return res.status(500).json({
    mensaje: "Ocurrió un error al intentar eliminar el producto del carrito",
  });
};

carritosCtrl.addProductoCarrito = async (req, res) => {
  const { id } = req.params;
  const carrito = await Carrito.findOne();
  const productoParaAgregar = await Producto.findOne({ _id: id });

  if (!carrito) {
    const nuevoProductoEnCarrito = new Carrito({
      email: req.user.email,
      productos: [productoParaAgregar],
      direccion: req.user.direccion,
    });
    await nuevoProductoEnCarrito.save();
  } else {
    const productosEnCarrito = carrito.productos;

    let productoYaExiste = false;
    for (const producto of productosEnCarrito) {
      if (producto._id.toString() === id) {
        productoYaExiste = true;
        producto.cantidadProdCarrito += 1;
        break;
      }
    }

    if (!productoYaExiste) {
      productoParaAgregar.cantidadProdCarrito = 1;
      productosEnCarrito.push(productoParaAgregar);
    }

    await Carrito.findByIdAndUpdate(carrito.id, {
      productos: productosEnCarrito,
    });
  }
};

carritosCtrl.botonFinalizar = async (req, res) => {
  const carrito = await Carrito.findOne();
  if (!carrito) {
    res.status(404).redirect("http://localhost:8080/productos");
  } else {
    await Carrito.deleteOne({ _id: carrito._id });
    const nuevaOrden = new Ordenes({
      email: carrito.email,
      productos: carrito.productos,
      direccion: carrito.direccion,
    });
    await nuevaOrden.save();
    const productosDelCarrito = [];
    res.status(200).render("carritos/allCarritos", { productosDelCarrito });

    //EMAIL CON LA ORDEN
    /* const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.USER_GMAIL,
        pass: process.env.PASS_GMAIL,
      },
    });

    //EMAIL
    const mailOptions = {
      from: "Remitente",
      to: `${req.user.email}`,
      subject: "Nueva orden",
      text: `DATOS DE LA ORDEN:
        EMAIL: ${carrito.email}
  
        PRODUCTOS: ${carrito.productos}
        
        DIRECCION: ${carrito.direccion}  
     `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).jsonp(req.body);
      }
    });*/
  }
};

export default carritosCtrl;
