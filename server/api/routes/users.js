const users = require("express").Router();
const { User, Team, Project } = require("../../db/models");
module.exports = users;

// GET all users, including team and projects
users.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Team,
                    include: {
                        model: Project,
                        as: 'projects'
                    }
                },

            ]
        });
        res.json(users);
    } catch (err) {
        next(err);
    }
});

users.get("/:userId", async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cur = await User.findByPk(userId, {
            include: [
                {
                    model: Team,
                    include: {
                        model: Project,
                        as: 'projects'
                    }
                },

            ]
        });
        res.json(cur);
    } catch (err) {
        next(err);
    }
})

users.post("/", async (req, res, next) => {
    try {
        const newUser = await User.create(req.body)
        res.json(newUser);
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

// WHEN AUTH IS SET UP, PUT GET LOGGED IN USER HERE -->
// {
// ...
// } 
