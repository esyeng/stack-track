const users = require("express").Router();
const { User, Team } = require("../../db/models");
module.exports = users;

// all users (test)
users.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: {
        model: Team,
      },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
