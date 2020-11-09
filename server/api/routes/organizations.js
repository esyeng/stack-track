const orgs = require("express").Router();
const { Organization } = require("../../db/models");
module.exports = orgs;

// GET all
orgs.get("/", async (req, res, next) => {
    try {
        const organizations = await Organization.findAll();
        res.json(organizations);
    } catch (err) {
        next(err);
    }
});

// GET one
orgs.get("/:orgId", async (req, res, next) => {
    try {
        const { orgId } = req.params;
        const org = await Organization.findByPk(orgId);
        res.json(org);
    } catch (err) {
        next(err);
    }
});

// POST new org
orgs.post("/", async (req, res, next) => {
    try {
        const { name, email, password, websiteUrl, imageUrl } = req.body;
        const newOrg = await Organization.create({
            name: name,
            email: email,
            password: password,
            websiteUrl: websiteUrl,
            imageUrl: imageUrl
        });
        res.json(newOrg);
    } catch (err) {
        next(err);
    }
});

// PUT one
orgs.put("/:orgId", async (req, res, next) => {
    try {
        const { orgId } = req.params;
        const { name, email, password, websiteUrl, imageUrl } = req.body;
        const orgToChange = await Organization.findByPk(orgId);
        orgToChange.imageUrl = imageUrl;
        orgToChange.name = name;
        orgToChange.email = email;
        orgToChange.password = password;
        orgToChange.websiteUrl = websiteUrl;
        await orgToChange.save();
        res.json(orgToChange);
    } catch (err) {
        next(err);
    }
});

// DELETE one
orgs.delete("/:orgId", async (req, res, next) => {
    try {
        const { orgId } = req.params;
        await Organization.destroy({
            where: {
                id: orgId
            }
        });
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});
