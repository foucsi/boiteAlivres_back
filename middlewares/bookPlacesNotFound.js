module.exports = function bookPlacesNotFound(err, req, res, next) {
    if(err.message === "BookPlace not found"){
        return res.status(404).json({status:404,result:false,error:"BookPlace not found"})
    }else {
        next(err);
    }
}