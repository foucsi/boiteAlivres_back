var express = require('express');
var router = express.Router();

const features_post_controllers = require("../controllers/FEATURES/features_post_controllers");

//GET

//POST
router.post("/addFeature", features_post_controllers.addFeature);

//DELETE

//UPDATE


module.exports = router;