var express = require('express');
var router = express.Router();

const bookPlaces_post_controllers = require("../controllers/BOOKPLACES/bookPlaces_post_controllers");

//GET

//POST
router.post("/addBookPlace/:uniqueId", bookPlaces_post_controllers.addBookPlace);

//DELETE

//UPDATE


module.exports = router;