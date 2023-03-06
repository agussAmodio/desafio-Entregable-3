import nodemailer from "nodemailer";
import Carrito from "../models/carritos.js";
import Producto from "../models/productos.js";
import Ordenes from "../models/ordenes.js";

const carritosCtrl = {};

carritosCtrl.renderCarritos = async (req, res) => {
  const carrito = await Carrito.findOne({ user: req.user.id }).lean();
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
    res.status(404).redirect("/productos/errorProductoNoEncontrado");
  } else {
    productosDelCarrito.splice(indiceProducto, 1);

    const resultado = await Carrito.updateOne(
      {},
      { productos: productosDelCarrito }
    );
    res.status(200).redirect("http://localhost:8080/carritos");
  }
};

carritosCtrl.addProductoCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await Carrito.findOne({ user: req.user.id });
    const productoParaAgregar = await Producto.findOne({ _id: id });

    if (!carrito) {
      const nuevoProductoEnCarrito = new Carrito({
        email: req.user.email,
        productos: [productoParaAgregar],
        direccion: req.user.direccion,
      });
      nuevoProductoEnCarrito.user = req.user.id;
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
    res.status(200).redirect("/productos");
  } catch (error) {
    res.status(404).redirect("/productos/errorProductoNoEncontrado");
  }
};

carritosCtrl.botonFinalizar = async (req, res) => {
  const carrito = await Carrito.findOne();
  if (!carrito || carrito.productos.length == 0) {
    res.status(404).redirect("http://localhost:8080/productos");
  } else {
    await Carrito.deleteOne({ _id: carrito._id });
    const nuevaOrden = new Ordenes({
      email: carrito.email,
      productos: carrito.productos,
      direccion: carrito.direccion,
    });
    nuevaOrden.user = req.user.id;
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
