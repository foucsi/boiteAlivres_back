var express = require('express');
var router = express.Router();

const nodemailer_post_controllers = require("../controllers/NODEMAILER/nodemailer_post_controllers");

//POST
router.post("/sendMsg", nodemailer_post_controllers.sendMsg);

module.exports = router;