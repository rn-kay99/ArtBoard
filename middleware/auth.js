const authCheck = (req, res, next) => {
    if(!req.user){
        // if user is not logged in
        res.redirect("/");
    }
    else{
        // if user is logged in
        next();
    }
}

module.exports = {
    authCheck: authCheck
}