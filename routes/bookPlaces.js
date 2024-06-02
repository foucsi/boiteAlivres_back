var express = require('express');
var router = express.Router();

const bookPlaces_post_controllers = require("../controllers/BOOKPLACES/bookPlaces_post_controllers");
const bookPlaces_delete_controllers = require("../controllers/BOOKPLACES/bookPlaces_delete_controllers");
const bookPlaces_get_controllers = require("../controllers/BOOKPLACES/bookPlaces_get_controllers");

//GET
router.get("/getBookPlaces", bookPlaces_get_controllers.getBookPlaces);

//POST
router.post("/addBookPlace/:uniqueId", bookPlaces_post_controllers.addBookPlace);

//DELETE
router.delete("/removeBookPlace/:id", bookPlaces_delete_controllers.deleteBookPlace)
//UPDATE


module.exports = router;