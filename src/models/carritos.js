const { Schema, model } = require("mongoose");

const carritoSchema = new Schema(
  {
    nombre: { type: String },
    _id: { type: String, required: true },
    foto: { type: String },
    precio: { type: Number },
    inCart: { type: Boolean, required: false },
    user: { type: String },
  },

  {
    timestamps: true,
  }
);

module.exports = model("carritos", carritoSchema);
