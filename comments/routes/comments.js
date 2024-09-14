var express = require('express');
var router = express.Router();

const comments_get_controllers = require("../controllers/comments_get_controllers");
const comments_post_controllers = require("../controllers/comments_post_controllers");
const comments_delete_controllers = require("../controllers/comments_delete_controllers");
//GET
router.get("/getAllComments", comments_get_controllers.getAllComments);
router.get("/getAllCommentsByBookPlace/:bookPlaceId", comments_get_controllers.getAllCommentsByBookPlace);

//POST
router.post("/addComment/:uniqueId", comments_post_controllers.addComments);

//DELETE
router.delete("/removeComment/:uniqueId", comments_delete_controllers.deleteComment);

//UPDATE

module.exports = router;