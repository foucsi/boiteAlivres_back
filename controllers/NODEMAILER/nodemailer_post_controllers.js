const nodemailer = require('nodemailer')

exports.sendMsg = async(req, res, next) => {
    const {message,email, bookPlaceId} = req.body

    if(!message){
        const error = new Error("Message is missing")
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

        const msg = `🚨 *Problème signalé !*\n\n` +
            `📧 *Email de l'expéditeur :* ${email}\n` +
            `📚 *Boîte à livres :* ${bookPlaceId}\n\n` +
            `💬 *Message :*\n"${message}"\n\n` +
            `🙏 *Merci de traiter ce problème dès que possible.*`;


        const mailOptions = {
            from: email,
            to: process.env.EMAIL_TEST,
            subject: 'Nouveau signalement',
            text: msg,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({result: true, message: "Message sent"});
    }catch (err){
        console.error(err)
        next(err)
    }
}