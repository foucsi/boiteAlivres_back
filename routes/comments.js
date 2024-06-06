var express = require('express');
var router = express.Router();

const comments_get_controllers = require("../controllers/COMMENTS/comments_get_controllers");
const comments_post_controllers = require("../controllers/COMMENTS/comments_post_controllers");

//GET

//POST
router.post("/addComment/:uniqueId", comments_post_controllers.addComment);
//DELETE

//UPDATE

module.exports = router;