const nodemailer = require('nodemailer')
const User = require("../../db/models/users")

exports.sendMsg = async(req, res, next) => {
    const {message,email} = req.body

    if(!message || !email){
        const error = new Error("Message or email is missing")
        return next(error)
    }

    try{
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_PASS,
                pass: process.env.PASWWORD_USER_PASS
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL_TEST,
            subject: 'Nouveau signalement',
            text: message,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).send('Signalement envoyé avec succès.');
    }catch (err){
        console.error(err)
        next(err)
    }
}