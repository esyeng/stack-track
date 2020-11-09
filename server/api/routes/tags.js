const tags = require("express").Router();
const { Tag } = require("../../db/models");
module.exports = tags;

// all tags (test)
tags.get("/", async (req, res, next) => {
    try {
        const allTags = await Tag.findAll();
        res.json(allTags);
    } catch (err) {
        next(err);
    }
});

// get all projects by tags

