const router = require("express").Router();
const usersController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("")
    .get(usersController.findAll)
    .post(usersController.create);

router.route("/user")
    .post(usersController.find)
    .put(usersController.update);
    
// Matches with "/api/users/:id"
router.route("/:email")
    .delete(usersController.remove);

module.exports = router;