const User = require("../../models/users");
const BookPlace = require("../../models/bookPlaces");

// Add a new bookPlaces
exports.addBookPlace = async (req, res, next) => {
    const {uniqueId}= req.params
    // const {name,street,region,postalCode} = address
    const {latitude,longitude,description,adress} = req.body
    try{
        const user = await User.findOne({uniqueId})
        if(!user){
            const err = new Error("User not found")
            return next(err)
        }
        const newBookPlace = new BookPlace({
            addedBy: user._id,
            latitude,
            longitude,
            description,
            adress
        })
        const savedBookPlace = await newBookPlace.save()
        return res.json({result:true,bookPlace:savedBookPlace})
    }catch(err){
        console.error(err)
        next(err)
    }
}
