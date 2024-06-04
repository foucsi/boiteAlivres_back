var express = require('express');
var router = express.Router();

const users_get_controllers = require("../controllers/USERS/users_get_controllers");
const users_post_controllers = require("../controllers/USERS/users_post_controllers");

//GET
router.get("/", users_get_controllers.getAllUsers);
router.get("/getAllUsers", users_get_controllers.getAllUsers);

//POST
router.post("/login", users_post_controllers.loginUser);
router.post("/register", users_post_controllers.registerUser);
//DELETE

//UPDATE

module.exports = router;
