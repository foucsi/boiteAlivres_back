const sharp = require("sharp");
const User = require("../../models/users");
const BookPlace = require("../../models/bookPlaces");
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
    const { bookPlaceId } = req.params;

    try {
        await sharp(req.files.userPhoto.data)
            .resize(800, 800, {
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
            .toFile(photoPath);

        const resultCloudinary = await cloudinary.uploader.upload(photoPath);
        console.log("Cloudinary upload result:", resultCloudinary);

        const updatedBookPlace = await BookPlace.findByIdAndUpdate(
            bookPlaceId,
            { $set: { photo: resultCloudinary.secure_url } },
            { new: true }
        );

        if (!updatedBookPlace) {
            console.log("BookPlace not found with id:", bookPlaceId);
            return res.status(404).json({ error: "BookPlace not found" });
        }

        console.log("Updated BookPlace:", updatedBookPlace);
        res.json({ result: true, bookPlace: updatedBookPlace });

        // Suppression de la photo temporaire
        fs.unlinkSync(photoPath);
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
