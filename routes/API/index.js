const router = require("express").Router();
const usersRoutes = require("./users");
const chatRoutes = require("./chat");

router.use("/users", usersRoutes);
router.use("/chat", chatRoutes);

module.exports = router;