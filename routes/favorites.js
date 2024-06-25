var express = require('express');
var router = express.Router();

const favorites_post_controllers = require("../controllers/FAVORITES/favorites_post_controllers");
const favorites_get_controllers = require("../controllers/FAVORITES/favorites_get_controllers");

//GET
router.get("/allFavoritesByUser/:uniqueId/:bookPlaceId", favorites_get_controllers.getFavoritesByUserId);


//POST
router.post("/addFavorite/:uniqueId/:bookPlaceId", favorites_post_controllers.addFavorite);

//DELETE

//UPDATE

module.exports = router;