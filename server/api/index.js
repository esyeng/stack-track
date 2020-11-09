"use strict";

const router = require("express").Router();

router.use("/users", require("./routes/users"));
router.use("/messages", require("./routes/messages"));
router.use("/organizations", require("./routes/organizations"));
router.use("/teams", require("./routes/teams"));
// router.use("/issues", require("./routes/issues"));
// router.use("/projects", require("./routes/projects"));
// router.use("/tags", require("./routes/tags"));

module.exports = router;