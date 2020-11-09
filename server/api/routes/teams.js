const teams = require("express").Router();
const { User, Team, Organization } = require("../../db/models");
module.exports = teams;


// all teams
teams.get("/", async (req, res, next) => {
    try {
        const allTeams = await Team.findAll({
            include: {
                model: User,
            },
        });
        res.json(allTeams);
    } catch (err) {
        next(err);
    }
});

// GET all by org
teams.get("/:orgId", async (req, res, next) => {
    try {
        const { orgId } = req.params;
        const orgTeams = await Team.findAll({
            where: {
                organizationId: orgId
            },
            include: {
                model: User
            }
        });
        res.json(orgTeams);
    } catch (err) {
        next(err);
    }
})

// GET one by team Id
teams.get("/:teamId", async (req, res, next) => {
    try {
        const { teamId } = req.params;
        const team = await Team.findByPk(teamId, {
            include: {
                model: User,
            },
        });
        res.json(team);
    } catch (err) {
        next(err);
    }
});

// POST new team under org
teams.post("/:orgId", async (req, res, next) => {
    try {
        const { orgId } = req.params;
        const { name } = req.body;
        const newTeam = await Team.create({
            name: name
        });
        const belongsTo = await Organization.findByPk(orgId);
        await newTeam.setOrganization(belongsTo);
        res.json(newTeam);
    } catch (err) {
        next(err);
    }
})

// PUT add user to team
teams.put("/:teamId/:userId", async (req, res, next) => {
    try {
        const { teamId, userId } = req.params;
        const teamToUpdate = await Team.findByPk(teamId, { include: User });
        const userToTeam = await User.findByPk(userId);
        await userToTeam.setTeam(teamToUpdate);
        res.json({ team: teamToUpdate, user: userToTeam });
    } catch (err) {
        next(err);
    }
});
// PUT remove user from team
teams.delete("/:teamId/:userId", async (req, res, next) => {
    try {
        const { teamId, userId } = req.params;
        const teamRemovedFrom = await Team.findByPk(teamId, { include: User });
        const dropUser = await User.findByPk(userId);
        await teamRemovedFrom.removeUser(dropUser);
        res.json({ team: teamRemovedFrom, user: dropUser });
    } catch (err) {
        next(err);
    }
})

// DELETE team
teams.delete("/:teamId", async (req, res, next) => {
    try {
        const { teamId } = req.params;
        await Team.destroy({
            where: {
                id: teamId
            }
        });
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});
