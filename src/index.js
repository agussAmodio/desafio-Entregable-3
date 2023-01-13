require("dotenv").config();

const app = require("./server");
require("./database");

const PORT = process.env.PORT;
app.listen(PORT || 8080, () => {
  console.log(`server corriendo en el puerto ${app.get("port")} `);
});
