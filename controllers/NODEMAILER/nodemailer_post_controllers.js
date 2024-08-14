const Msg = require("../../db/models/signalMsgs")
const nodemailer = require('nodemailer')

exports.sendMsg = async(req, res, next) => {
    const {message,email} = req.body

    if(!message || !email){
        const error = new Error("Message or email is missing")
        return next(error)
    }
}