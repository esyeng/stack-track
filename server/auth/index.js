const authorize = require("express").Router();
const User = require("../db/models/User");
module.exports = authorize;

authorize.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      console.log("User not found, req.body.email");
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(req.body.password)) {
      console.log(`Incorrect password for user ${req.body.email}`);
      res.status(401).send("Wrong password");
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

authorize.post("/signup", async (req, res, next) => {
  try {
    const { fName, lName, email, username, password } = req.body;
    const user = await User.create({
      ...fName,
      ...lName,
      ...email,
      ...username,
      ...password,
    });
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

authorize.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

authorize.get("/me", (req, res) => {
  res.json(req.user);
});

// authorize.use("/google")
