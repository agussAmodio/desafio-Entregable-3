import { config } from "dotenv";
config();
import mongoose from "mongoose";
mongoose.set("strictQuery", false);

try {
  const db = mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("Conectado con la base de datos!!");
} catch (error) {
  console.error(error);
}
