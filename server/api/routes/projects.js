const projects = require("express").Router();
const { Project, Team, User, Issue } = require("../../db/models");
module.exports = projects;

// GET all & include issues & users
projects.get("/", async (req, res, next) => {
    try {
        const allProjects = await Project.findAll({
            include: [
                {
                    model: User,
                    as: 'users',
                    through: {
                        attributes: [
                            'fName',
                            'lName',
                        ],
                    }
                },
                {
                    model: Issue
                }
            ]
        });
        res.json(allProjects);
    } catch (err) {
        next(err);
    }
});


// GET all by team & include issues & users

projects.get("/:teamId", async (req, res, next) => {
    try {
        const { teamId } = req.params;
        const teamToFind = await Team.findByPk(teamId,
            {
                include: {
                    model: Project,
                    as: "projects",
                    include: [
                        {
                            model: User,
                            as: 'users',
                            through: {
                                attributes: ['fName', 'lName']
                            }
                        },
                        {
                            model: Issue
                        }
                    ]
                }
            });
        res.json(teamToFind);
    } catch (err) {
        next(err);
    }
})

// GET one project include issues & users

// POST new project

// PUT update project info

// PUT assign user to project, assign role

// DELETE project

// DELETE user from project