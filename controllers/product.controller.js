/**
 * This file contains the controller logic for the product resource
 * If the app gets a CRUD request for the product resource, methods defined in this file will be called
 */
const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

// Create and save a new product
exports.create = (req, res) => {

    // Create the product object to be stored in the db
    const product = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        categoryId: req.body.categoryId
    }

    Product.create(product).then(product => {
        console.log(`Product name: [${product.name}] created in the db`);
        res.status(201).send(product);
    }).catch(err => {
        console.log(`Error while creating the product with name: [${product.name}]`);
        res.status(500).send({
            message: "Internal error while creating the product"
        });
    })

}

// Get a list of all the products
exports.findAll = (req, res) => {
    let productName = req.query.name;

    let minCost = req.query.minCost;
    let maxCost = req.query.maxCost;

    let promise;
    if (productName) {
        promise = Product.findAll({
            where: {name: productName}
        })
    } else if (minCost && maxCost) {
        promise = Product.findAll({
            where: {cost: {
                [Op.gte]: minCost,
                [Op.lte]: maxCost
            }}
        })
    } else if (minCost) {
        promise = Product.findAll({
            where: {cost : {
                [Op.gte]: minCost
            }}
        })
    } else if (maxCost) {
        promise = Product.findAll({
            where: {cost: {
                [Op.lte] : maxCost
            }}
        })
    } else {
        promise = Product.findAll();
    }
    promise.then(products => {
        res.status(200).send(products);
    }).catch(err => {
        res.status(500).send({
            message: "Internal server error while fetching all the products."
        });
    });
}

// Get a product based on the product id
exports.findOne = (req, res) => {
    const productId = req.params.id;
    Product.findByPk(productId).then(product => {
        if (product == null) {
            res.status(404).send({
                message: `Product with the productId [${productId}] not found.`
            })
            return;
        }
        res.status(200).send(product);
    }).catch(err => {
        res.status(500).send({
            message: "Internal server error while finding product."
        })
    })
}

// Update an existing product
exports.update = (req, res) => {

    // Create the product to be added to the db
    const product = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost
    }
    const productId = req.params.id;

    Product.update(product, {
        returning: true,
        where: {id : productId}
    }).then(updatedProduct => {
        Product.findByPk(productId).then(product => {
            res.status(200).send(product);
        }).catch(err => {
            res.status(500).send({
                message: "Some internal error while fetching the product by id."
            })
        })
    }).catch(err => {
        res.status(500).send({
            message: "Internal server error while updating the product."
        });
    })
}

// Delete a product based on the id
exports.delete = (req, res) => {
    const productId = req.params.id;

    Product.destroy({
        where: {id : productId}
    }).then(result => {
        res.status(200).send({
            message: "The product was deleted."
        });
    }).catch(err => {
        req.status(500).send({
            message: "Internal server error while deleting the product based on the id."
        })
    })
}