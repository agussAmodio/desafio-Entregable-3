import passport from "passport";
import LocalStrategy from "passport-local";
import User from "../models/usuarios.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: "No se encontro un usuario" });
      } else {
        const match = await user.comparePassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, { message: "contraseña incorrecta" });
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport;
