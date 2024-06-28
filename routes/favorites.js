var express = require('express');
var router = express.Router();

const favorites_post_controllers = require("../controllers/FAVORITES/favorites_post_controllers");
const favorites_get_controllers = require("../controllers/FAVORITES/favorites_get_controllers");
const favorites_delete_controllers = require("../controllers/FAVORITES/favorites_delete_controllers");

//GET
router.get("/allFavoritesByUser/:uniqueId/:bookPlaceId", favorites_get_controllers.getFavoritesByUserId);
router.get("/favoritesByUser/:uniqueId", favorites_get_controllers.getFavorites);

//POST
router.post("/addFavorite/:uniqueId/:bookPlaceId", favorites_post_controllers.addFavorite);

//DELETE
router.delete("/deleteFavorite/:favoriteId", favorites_delete_controllers.deleteFavorite);

//UPDATE

module.exports = router;