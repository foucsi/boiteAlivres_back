var express = require('express');
var router = express.Router();

const features_post_controllers = require("../controllers/FEATURES/features_post_controllers");
const features_get_controllers = require("../controllers/FEATURES/features_get_controllers");
//GET
router.get("/features", features_get_controllers.getAllFeatures);

//POST
router.post("/addFeature", features_post_controllers.addFeature);

//DELETE

//UPDATE


module.exports = router;