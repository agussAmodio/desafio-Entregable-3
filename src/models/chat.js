import { Schema, model } from "mongoose";

const chatSchema = new Schema(
  {
    email: { type: String, required: true },
    mensaje: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("chat", chatSchema);
