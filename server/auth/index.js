const authorize = require("express").Router();
const User = require("../db/models/User");
module.exports = authorize;

authorize.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      console.log(`User not found, ${req.body.email}`);
      res.status(401).send("Wrong username and/or password");
    } else if (!user.correctPassword(`${req.body.password}`)) {
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
    const { fName, lName, email, username, password, teamId } = req.body;
    console.log("before create", req.body);
    const user = await User.create({
      fName: fName,
      lName: lName,
      email: email,
      username: username,
      password: password,
    });

    if (teamId && typeof parseInt(teamId, 10) === "number") {
      await user.setTeam(parseInt(teamId, 10));
    }
    console.log(user);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send(err);
    } else {
      next(err);
    }
  }
});

authorize.post("/logout", (req, res) => {
  res.redirect("/");
  req.logout();
  req.session.destroy();
});

authorize.get("/me", (req, res) => {
  res.json(req.user);
});

// authorize.use("/google")
