const teams = require("express").Router();
const { User, Team } = require("../../db/models");
module.exports = teams;

// all teams (test)
teams.get("/", async (req, res, next) => {
  try {
    const allTeams = await User.findAll({
      include: {
        model: User,
      },
    });
    res.json(allTeams);
  } catch (err) {
    next(err);
  }
});
