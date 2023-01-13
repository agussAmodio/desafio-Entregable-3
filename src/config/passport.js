const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/usuarios");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      // Match Email's User
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
