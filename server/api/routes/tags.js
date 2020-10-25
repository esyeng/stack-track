const tags = require("express").Router();
const { User, Team } = require("../../db/models");
module.exports = tags;

// all tags (test)
tags.get("/", async (req, res, next) => {
  try {
    const allTags = await User.findAll();
    res.json(allTags);
  } catch (err) {
    next(err);
  }
});
