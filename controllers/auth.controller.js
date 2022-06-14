const db = require("../models");
const config = require("../configs/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    console.log("Inside the sign up call.")

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        console.log("User created.");
        if (req.body.roles) {
            Role.findAll({where: {
                name: {[Op.or] : req.body.roles}
            }})
            .then(roles => {
                // Sequelize figures out setRoles functions by itself based on the primary and foreign keys etc
                user.setRoles(roles).then(() => {
                    res.status(200).send({message: "User registered successfully."});
                })
            })
        } else {
            // Role = 1
            user.setRoles([1]).then(() => {
                res.status(200).send({ message: "User registered succesfully."});
            })
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message});
    })
}

exports.signin = (req, res) => {
    User.findOne({
        where: {username: req.body.username}
    })
    .then(user => {
        if (!user) {
            res.status(404).send({message: "User not found."});
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            res.status(401).send({
                message: "Password is invalid",
                accessToken: null
            })
        }

        let token = jwt.sign({id: user.id}, config.secret, {expiresIn: 86400});

        let authorities = [];
        user.getRoles().then(roles => {
            for (let i = 0; i< roles.length; i++) {
                authorities.push("ROLES_"+roles[i].name.toUpperCase());
            };
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })

        

    }).catch(err => {
        res.status(500).send({message: err.message});
    })
}

