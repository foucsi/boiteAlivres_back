var express = require('express');
var router = express.Router();

const bookPlaces_post_controllers = require("../controllers/BOOKPLACES/bookPlaces_post_controllers");
const bookPlaces_delete_controllers = require("../controllers/BOOKPLACES/bookPlaces_delete_controllers");
const bookPlaces_get_controllers = require("../controllers/BOOKPLACES/bookPlaces_get_controllers");
const bookPlaces_update_controllers = require("../controllers/BOOKPLACES/bookPlaces_update_controllers");
//GET
router.get("/getAllBookPlaces", bookPlaces_get_controllers.getAllBookPlaces);

//POST
router.post("/addBookPlace/:uniqueId", bookPlaces_post_controllers.addBookPlace);

//DELETE
router.delete("/removeBookPlace/:id", bookPlaces_delete_controllers.deleteBookPlace)

//UPDATE
router.put("/updateBookPlace/:bookPlaceId", bookPlaces_update_controllers.updateBookPlace);
router.put("/updateBookPlace/:bookPlaceId", bookPlaces_update_controllers.updateDescription);
module.exports = router;