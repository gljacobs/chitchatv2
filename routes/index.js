const router = require("express").Router();
const apiRoutes = require("./API");

// API Routes
router.use("/API", apiRoutes);

module.exports = router;