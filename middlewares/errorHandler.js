module.exports = function errorHandler(err, req, res, next){
    console.error(err);
    res.status(500).json({result:false, error:"An error occurred"})
}