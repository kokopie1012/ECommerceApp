const cartController = require("../controllers/cart.controller");
const {authJwt} = require("../middlewares");

module.exports = (app) => {

    // Route for the post request to create the cart
    app.post("/ecomm/api/v1/carts", [authJwt.verifyToken], cartController.create);

    // To update cart, add items
    app.put("/ecomm/api/v1/carts/:id", [authJwt.verifyToken], cartController.update);

    // Get the items in the cart
    app.get("/ecomm/api/v1/carts/:cartId", [authJwt.verifyToken], cartController.getCart);


}

