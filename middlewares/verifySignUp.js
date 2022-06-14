const db = require("../models");
const User = db.user;
const ROLES = db.ROLES;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
    console.log("Checking duplicated username or email.");
    console.log(req.body.username);
    console.log(req.body);

    User.findOne({
        where: {username: req.body.username}
    })
    .then(user => {
        if (user) {
            res.status(400).send({
                message: "Failed! Username is already in use."
            })
            return;
        }
        User.findOne({
            where: {email: req.body.email}
        })
        .then(user => {
            if (user) {
                res.status(400).send({
                    message: "Failed! Email is already in use."
                })
                return;
            }
            next();
        })
    })
}

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if(!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: "Failed! These role/roles do not exist."
                })
                return;
            }
        }
    }
    next();
}

module.exports = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted
}