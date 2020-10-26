"use strict";

const router = require("express").Router();
module.exports = router;

router.use("/users", require("./routes/users"));
router.use("/teams", require("./routes/teams"));
router.use("/organizations", require("./routes/organizations"));
router.use("/issues", require("./routes/issues"));
router.use("/projects", require("./routes/projects"));
router.use("/messages", require("./routes/messages"));
router.use("/tags", require("./routes/tags"));
