const sharp = require("sharp");

const User = require("../../models/users");

const cloudinary = require("cloudinary").v2;
const uniqid = require("uniqid");
const fs = require("fs");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadPhoto = async (req, res, next) => {
    const photoPath = `./tmp/${uniqid()}.jpg`;

    try {
        // Redimensionnement de l'image avec sharp
        await sharp(req.files.userPhoto.data)
            .resize(800, 800, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
            .toFile(photoPath);

        const resultCloudinary = await cloudinary.uploader.upload(photoPath);

        const updatedUser = await User.findOneAndUpdate(
            {uniqueId: req.params.uniqueId},
            {$set: {photo: resultCloudinary.secure_url}},
            {new: true}
        );

        if (!updatedUser) {
            return res.json({error: "User not found"});
        }

        res.json({result: true, user: updatedUser});

        // Suppression de la photo temporaire
        fs.unlinkSync(photoPath);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
}
