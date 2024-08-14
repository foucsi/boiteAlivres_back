const Msg = require("../../db/models/signalMsgs")

exports.sendMsg = async(req, res, next) => {
    const {message,email} = req.body

    if(!message || !email){
        const error = new Error("Message or email is missing")
        return next(error)
    }
}