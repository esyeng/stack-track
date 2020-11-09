const issues = require("express").Router();
const { Issue, Comment, User, Project, Tag } = require("../../db/models");
module.exports = issues;

// GET all by project
issues.get("/:projId", async (req, res, next) => {
    try {
        const { projId } = req.params;
        const allIssues = await Issue.findAll({
            where: {
                projectId: projId
            },
            include: Comment
        });
        res.json(allIssues);
    } catch (err) {
        next(err);
    }
});


// GET all by tags
issues.get("/:projId/:issueId", async (req, res, next) => {
    try {
        const { projId, issueId } = req.params;
        const taggedIssues = await Issue.findAll({
            where: {
                projectId: projId
            },
            include: [
                {
                    model: Comment
                },
                {
                    model: Tag,
                    where: {
                        issueId: issueId
                    }
                }
            ]
        });
        res.json(taggedIssues);
    } catch (err) {
        next(err);
    }
});



// POST new issue
issues.post("/", async (req, res, next) => {
    try {
        const { ticketNumber, description, category, status } = req.body;
        const newIssue = await Issue.create({
            ...ticketNumber,
            ...description,
            ...category,
            ...status,
        });
        res.json(newIssue);
    } catch (err) {
        next(err);
    }
});


// POST new comment
issues.post("/:issueId", async (req, res, next) => {
    try {
        const { issueId } = req.params;
        const { dateSent, body, userId } = req.body;
        const commenter = await User.findByPk(userId);
        const issueCommentingOn = await Issue.findByPk(issueId, {
            include: [
                {
                    model: Comment
                },
                {
                    model: Tag,
                    where: {
                        issueId: issueId
                    }
                }
            ]
        });
        const newComment = await Comment.create({
            ...dateSent,
            ...body
        });
        await commenter.addComment(newComment);
        await issueCommentingOn.addComment(newComment);
        res.json({ comment: newComment, issue: issueCommentingOn });
    } catch (err) {
        next(err);
    }
});

// PUT updated issue information
issues.put("/:issueId", async (req, res, next) => {
    try {
        const { issueId } = req.params;
        const { description, category, status } = req.body;
        const issue = await Issue.findByPk(issueId, {
            include: [
                {
                    model: Comment,
                },
                {
                    model: Tag,
                    where: {
                        issueId: issueId
                    }
                }
            ]
        });
        issue.description = description;
        issue.category = category;
        issue.status = status;
        await issue.save();
        res.json(issue);
    } catch (err) {
        next(err);
    }
});

// PUT revised comment edits
issues.put("/:issueId/:commentId", async (req, res, next) => {
    try {
        const { issueId, commentId } = req.params;
        const { dateSent, body } = req.body;
        const issueCommentingOn = await Issue.findByPk(issueId, {
            include: {
                model: Comment,
                where: {
                    id: commentId
                }
            }
        });
        const comm = await Comment.findByPk(commentId);
        comm.dateSent = dateSent;
        comm.body = body;
        await comm.save();
        await issueCommentingOn.addComment(comm);
        res.json({ issue: issueCommentingOn, comment: comm });
    } catch (err) {
        next(err);
    }
});


// DELETE issue
issues.delete("/:issueId", async (req, res, next) => {
    try {
        await Issue.destroy({
            where: {
                id: issueId
            }
        });
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});