module.exports = (roles) => {
    return async (req, res, next) => {
        const userRole = req.body.role;
        if(roles.includes(userRole)){
            next();
        }
        else {
            return res.status(401).send("you cant do it");
        }
    }
}