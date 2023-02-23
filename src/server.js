const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const socketio = require("socket.io");

// INICIALIZACIONES
const app = express();
const PORT = process.env.PORT;
require("./config/passport");
require("dotenv").config();
require("./database");

// CONFIGURACIONES
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.json());
app.use(methodOverride("_method"));

// VARIALBES GLOBALES
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// ROUTES
app.use(require("./routes/index.routes"));
app.use(require("./routes/productos.routes"));
app.use(require("./routes/users.routes"));
app.use(require("./routes/carritos.routes"));
app.use(require("./routes/chat.routes"));

// ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT || 8080, () => {
  console.log(`server corriendo en el puerto ${app.get("port")} `);
});

//module.exports = app;
