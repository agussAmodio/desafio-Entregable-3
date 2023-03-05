import { Server as HTTPServer } from "http";
import { Server as SocketServer } from "socket.io";
import express from "express";
import exphbs from "express-handlebars";
import passport from "passport";
import flash from "connect-flash";
import session from "express-session";
import methodOverride from "method-override";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { config } from "dotenv";
config();

import "./config/socket.js";
import "./config/passport.js";
import "./database.js";

// INICIALIZACIONES
const app = express();
const httpServer = new HTTPServer(app);
const io = new SocketServer(httpServer);
const __dirname = dirname(fileURLToPath(import.meta.url));

// CONFIGURACIONES
app.set("port", process.env.PORT || 8080);
app.set("sessionExp", process.env.SESSION_EXP || 60);
app.set("views", join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs.engine({
    defaultLayout: "main",
    layoutsDir: join(app.get("views"), "layouts"),
    partialsDir: join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    cookie: { maxAge: Number(process.env.SESSION_EXP) * 60000 },
    secret: "secret",
    resave: false,
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

import productosRoutes from "./routes/productos.routes.js";
import usersRoutes from "./routes/users.routes.js";
import carritosRoutes from "./routes/carritos.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import ordenesRoutes from "./routes/ordenes.routes.js";

app.use(productosRoutes);
app.use(usersRoutes);
app.use(carritosRoutes);
app.use(chatRoutes);
app.use(ordenesRoutes);

// ARCHIVOS ESTATICOS
app.use(express.static(join(__dirname, "public")));

httpServer.listen(process.env.PORT || 8080, () => {
  console.log(`server corriendo en el puerto ${app.get("port")}`);
});
