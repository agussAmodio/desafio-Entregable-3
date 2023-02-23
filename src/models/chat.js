const { Schema, model } = require("mongoose");

const chatSchema = new Schema(
  {
    email: { type: String, required: true },
    foto: { type: String, required: true },
    mensaje: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("chat", chatSchema);
