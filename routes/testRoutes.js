var express = require('express');
var router = express.Router();

const test_get_controllers = require("../controllers/TESTS/test_get_controllers");

//GET
router.get("/testRoutes", test_get_controllers.testRoutes);

module.exports = router;