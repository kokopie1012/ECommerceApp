/*
* This file contains the controller for the Category resource

* Everytime a request (CRUD) comes for category, methods defined in this controller file will be executed.
*/

// This line is not really required.
const category = require("../models");
// db is importing the exported db object from index.js in models
const db = require("../models");
const Category = db.category;

// Create and save a new category
exports.create = (req, res) => {
    
    // Validation of the request body
    if (!req.body.name) {
        res.status(400).send({
            message: "Name of the category can't be empty!"
        })
        return;
    }

    // Creation of the category object to be stored in the db
    const category = {
        name: req.body.name,
        description: req.body.description
    }

    // Storing the category object in the db
    Category.create(category).then(category => {
        console.log(`category name : [${category.name}] got inserted into DB.`);
        res.status(201).send(category);
    }).catch(err => {
        console.log(`Issue in inserting category [${category.name}]. Error : ${err.message}`);
        res.status(500).send({
            message: "Internal error while inserting category into db"
        })
    });

}

// Get a list of all the categories
exports.findAll = (req, res) => {
    let categoryName = req.query.name;
    let promise;

    if (categoryName) {
        promise = Category.findAll({
            where: {
                name : categoryName
            }
        })
    } else {
        promise = Category.findAll();
    }

    promise.then(categories => {
        res.status(200).send(categories);
    }).catch(err => {
        res.status(500).send({
            message: "Internal error while fetching all the categories."
        })
    })
}

// Get a category based on the category id
exports.findOne = (req, res) => {
    const categoryId = req.params.id;

    Category.findByPk(categoryId).then(category => {
        res.status(200).send(category);
    }).catch(err => {
        res.status(500).send({
            message: "Internal error while fetching the category by id."
        })
    })
}

// Update an existing category
exports.update = (req, res) => {

    // Validation of the request body
    if (!req.body.name) {
        res.status(400).send({
            message: "Name of the category can't be empty!"
        })
        return;
    }

    // Creating the category object to be stored in the DB
    const category = {
        name: req.body.name,
        description: req.body.description
    }
    const categoryId = req.params.id;

    // Updating the model
    Category.update(category, {
        returning: true,
        where : {id : categoryId}
    }).then(updatedCategory => {
        Category.findByPk(categoryId).then(category => {
            res.status(200).send(category);
        }).catch(err => {
            res.status(500).send({
                message: "Error while fetching category by id."
            })
        })
    }).catch(err => {
        res.status(500).send({
            message: "Some Internal error while fetching the category based on the id"
        })
    })
}

// Delete an existing category based on the category id
exports.delete = (req, res) => {
    const categoryId = req.params.id;

    Category.destroy({
        where: {id : categoryId}
    }).then(result => {
        res.status(200).send({
            message: "Category successfully deleted from the model."
        })
    }).catch(err => {
        res.status(500).send({
            message: "Some Internal error while deleting the category based on the id"
        })
    })
}