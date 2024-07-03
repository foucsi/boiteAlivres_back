exports.testRoute = (req, res, next) => {

    const {number} = req.body
    if(number === 0){
        throw new Error("Number is 0")
    }

    return res.status(200).json({
        message: "Test route",
        number: number
    })
}