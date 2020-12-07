const projects = require("express").Router();
const { Project, Team, User, Issue, Comment } = require("../../db/models");
module.exports = projects;

// GET all & include issues & users
projects.get("/", async (req, res, next) => {
  try {
    const allProjects = await Project.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Issue,
          include: {
            model: Comment,
          },
        },
      ],
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
    const teamToFind = await Team.findByPk(teamId, {
      include: {
        model: Project,
        as: "projects",
        include: [
          {
            model: User,
            // as: "users",
            // through: {
            //   attributes: ["fName", "lName"],
            // },
          },
          {
            model: Issue,
            include: {
              model: Comment,
            },
          },
        ],
      },
    });
    res.json(teamToFind);
  } catch (err) {
    next(err);
  }
});

// GET one project include issues & users
projects.get("/i/:projId", async (req, res, next) => {
  try {
    const { projId } = req.params;
    const proj = await Project.findByPk(projId, {
      include: [
        {
          model: User,
          //   as: "users",
          //   through: {
          //     attributes: ["fName", "lName"],
          //   },
        },
        {
          model: Issue,
          include: {
            model: Comment,
          },
        },
      ],
    });
    res.json(proj);
  } catch (err) {
    next(err);
  }
});

// POST new project
projects.post("/", async (req, res, next) => {
  try {
    const { title, description, category, dateCreated, status } = req.body;
    const newProject = await Project.create({
      ...title,
      ...description,
      ...category,
      ...dateCreated,
      ...status,
    });
    res.json(newProject);
  } catch (err) {
    next(err);
  }
});

// PUT update project info
projects.put("/:projId", async (req, res, next) => {
  try {
    const { title, description, category, dateCreated, status } = req.body;
    const { projId } = req.params;
    const projToUpdate = await Project.findByPk(projId);
    projToUpdate.title = title;
    projToUpdate.description = description;
    projToUpdate.category = category;
    projToUpdate.dateCreated = dateCreated;
    projToUpdate.status = status;
    await projToUpdate.save();
    res.json(projToUpdate);
  } catch (err) {
    next(err);
  }
});

// PUT assign user to project, assign role
projects.put("/:projId/:userId", async (req, res, next) => {
  try {
    const { role } = req.body;
    const { projId, userId } = req.params;
    const projToUpdate = await Project.findByPk(projId, {
      include: [
        {
          model: User,
          as: "users",
          through: {
            attributes: ["fName", "lName"],
          },
        },
        {
          model: Issue,
          include: {
            model: Comment,
          },
        },
      ],
    });
    const userToAdd = await User.findByPk(userId);
    await userToAdd.setProjects(projToUpdate);
    userToAdd.role = role;
    await userToAdd.save();
    res.json({ project: projToUpdate, user: userToAdd });
  } catch (err) {
    next(err);
  }
});

// DELETE project
projects.delete("/:projId", async (req, res, next) => {
  try {
    const { projId } = req.params;
    await Project.destroy({
      where: {
        id: projId,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// DELETE user from project
projects.delete("/:projId/:userId", async (req, res, next) => {
  try {
    const { projId, userId } = req.params;
    const projectToDeleteUser = await Project.findByPk(projId, {
      include: [
        {
          model: User,
          as: "users",
          through: {
            attributes: ["fName", "lName"],
          },
        },
        {
          model: Issue,
          include: {
            model: Comment,
          },
        },
      ],
    });
    const userToRemove = await User.findByPk(userId);
    await projectToDeleteUser.removeUsers(userToRemove);
    res.json({ project: projectToDeleteUser, user: userToRemove });
  } catch (err) {
    next(err);
  }
});
