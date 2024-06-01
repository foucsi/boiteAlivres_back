module.exports = function usersNotFound(err, req, res, next) {
    if (err.message === 'User not found') {
        console.error(err);
        res.status(404).json({result: false, error: "User not found"});
    }else if(err.message === 'Mot de passe invalide ou email erroné'){
        console.error(err);
        res.status(400).json({result: false, error: "Mot de passe invalide ou email erroné"});

    } else {
        next(err);
    }
}