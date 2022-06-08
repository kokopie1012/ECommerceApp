const productController = require("../controllers/product.controller");

module.exports = (app) => {
    // Route for POST request to create the product
    app.post("/ecomm/api/v1/products", productController.create);

    // Route for the GET request to fetch all the products
    app.get("/ecomm/api/v1/products", productController.findAll);

    // Route for the GET request to fetch a product by id
    app.get("/ecomm/api/v1/products/:id", productController.findOne);

    // Route for the PUT request to update a product by id
    app.put("/ecomm/api/v1/products/:id", productController.update);

    // Route for the delete request to delete a product by id
    app.delete("/ecomm/api/v1/products/:id", productController.delete);
}