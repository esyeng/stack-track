const router = require("express").Router();
module.exports = router;

router.use("/users", require("./routes/users"));
