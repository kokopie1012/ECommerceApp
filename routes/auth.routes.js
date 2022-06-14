const authController = require("../controllers/auth.controller");
const verifySignup = require("../middlewares/verifySignUp");

module.exports = (app) => {

    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/ecomm/api/v1/auth/signup", [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],authController.signup);
    
    app.post("/ecomm/api/v1/auth/signin", authController.signin);
}