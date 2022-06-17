const productController = require("../controllers/product.controller");
const {requestValidator, authJwt} = require("../middlewares");

// In the routes, always check the token first and then verfy if admin or not

module.exports = (app) => {
    // Route for POST request to create the product
    app.post("/ecomm/api/v1/products", [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin],productController.create);

    // Route for the GET request to fetch all the products
    app.get("/ecomm/api/v1/products", productController.findAll);

    // Route for the GET request to fetch a product by id
    app.get("/ecomm/api/v1/products/:id", productController.findOne);

    // Route for the PUT request to update a product by id
    app.put("/ecomm/api/v1/products/:id", [requestValidator.validateProductRequest, authJwt.verifyToken, authJwt.isAdmin],productController.update);

    // Route for the delete request to delete a product by id
    app.delete("/ecomm/api/v1/products/:id", [authJwt.verifyToken, authJwt.isAdmin],productController.delete);

    // Route to GET all the products under a category
    app.get("/ecomm/api/v1/categories/:categoryId/products", [requestValidator.validateCategoryPassedInReqParams],productController.getProductsUnderCategory);
}