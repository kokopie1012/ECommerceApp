const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        res.status(403).send({
            message: "No token provided."
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: "Unauthorised."
            });
        }
        req.userId = decoded.id; // This is used in cart
        next();
    })
}



const isAdmin = (req, res, next) => {

    User.findByPk(req.userId)
    .then(user => {
        console.log("Userssss")
        console.log(user);
        user.getRoles() 
        .then(roles => {
            for(let i = 0; i < roles.length; i++) {
                if(roles[i].name === "admin") {
                    next();
                    return;
                }
            }

            res.status(403).send({
                message: "Required Admin Role"
            });
            return;
        });
    });
};

module.exports = {
    verifyToken,
    isAdmin
}