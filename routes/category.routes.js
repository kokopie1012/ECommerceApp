// This file contains the routing logic for Category resource and exports it

const categoryController = require("../controllers/category.controller");

module.exports = (app) => {

    //  Route for the POST request to create a category
    app.post("/ecomm/api/v1/categories", categoryController.create);

    // Route for the GET request to fetch all the categories
    app.get("/ecomm/api/v1/categories", categoryController.findAll);

    // Route for the GET request to fetch a category based on the id
    app.get("/ecomm/api/v1/categories/:id", categoryController.findOne);

    // Route for the PUT request to update a category based on the id
    app.put("/ecomm/api/v1/categories/:id", categoryController.update);

    // Route fot the DELETE request to delete a category based on the id
    app.delete("/ecomm/api/v1/categories/:id", categoryController.delete);

}
