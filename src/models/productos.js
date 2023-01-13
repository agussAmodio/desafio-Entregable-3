const { Schema, model } = require("mongoose");

//nombre, descripcion, id, codigo, foto, precio, stock

const productosSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    id: { type: Number, required: true },
    codigo: { type: Number, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Productos", productosSchema);
