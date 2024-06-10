var express = require('express');
var router = express.Router();

const photos_post_controllers = require("../controllers/PHOTOS/photos_post_controllers");

//UPLOAD PHOTO
router.put("/uploadPhoto/:bookPlaceId", photos_post_controllers.uploadPhoto);

module.exports = router;