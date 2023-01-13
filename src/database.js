const mongoose = require("mongoose");
const LOGIN_MONGODB_URI = process.env.LOGIN_MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(LOGIN_MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((db) => console.log("Base de datos conectada correctamente!"))
  .catch((err) => console.log(err));
