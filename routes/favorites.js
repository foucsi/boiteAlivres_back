var express = require('express');
var router = express.Router();

const favorites_post_controllers = require("../controllers/FAVORITES/favorites_post_controllers");

//GET

//POST
router.post("/addFavorite/:uniqueId/:bookPlaceId", favorites_post_controllers.addFavorite);
//DELETE

//UPDATE

module.exports = router;