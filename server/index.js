const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();
const db = require("./db/db");
const session = require("express-session");
const passport = require("passport");
const Sequelize = require("sequelize");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({ db });
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`tracking stacks on ${PORT}`)
);
const io = require("socket.io")(server);

module.exports = app;

require("./socket")(io);
// pull in api keys as needed
// if (process.env.NODE_ENV === "production") {
//   require("../secret.js");
//   // require("./db/db.config.js");
// }
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// logware
app.use(morgan("dev"));

// body parse mdwre
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "it's a secret to everybody",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

// app.use("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "public/index.html"));
// });
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../public/index.html"));
// });

app.use((req, res, next) =>
  path.extname(req.path).length > 0 ? res.status(404).send("Not found") : next()
);

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});
