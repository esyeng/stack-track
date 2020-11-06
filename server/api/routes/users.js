const users = require("express").Router();
const { User, Team } = require("../../db/models");
module.exports = users;

// all users (test)
users.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

users.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cur = await User.findByPk(userId);
    res.json(cur);
  } catch (err) {
    next(err);
  }
})

users.post("/", async (req, res, next) => {
  try {
    // const { first, last, user, title, bio, profileImageUrl, email, password } = req.body;
    const newUser = await User.create(req.body)
    res.send(newUser);
  } catch (err) {
    next(err);
  }
})

users.put("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cur = await User.findByPk(userId);
    await cur.update(req.body);
    res.json(cur);
  } catch (err) {
    next(err);
  }
})

users.delete("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const cur = await User.findByPk(userId);
    await User.delete(cur);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
})