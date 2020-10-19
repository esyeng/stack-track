const users = require("express").Router();
module.exports = users;

users.get("/", (req, res, next) => {
  try {
    res.json("hello server");
  } catch (err) {
    next(err);
  }
});
