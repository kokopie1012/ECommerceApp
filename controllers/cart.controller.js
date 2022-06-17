const db = require("../models");
const Product = db.product;
const Cart = db.cart;
const Op = db.Sequelize.Op;

// Create and save a new cart
exports.create = (req, res) => {
    const cart = {
        userId: req.userId // We will get this from the middleware in authjwt
    }

    const itemIds = req.body.items;
    Cart.create(cart).then(cart => {
        res.status(201).send(cart);
    }).catch(err => {
        console.log(err.message);
        res.status(500).send({
            message: "Some internal error while creating the cart."
        })
    })

}

exports.update = (req, res) => {
    const cartId = req.params.id;

    Cart.findByPk(cartId)
    .then(cart => {
        console.log(cart);
        Product.findAll({
            where: {id: req.body.productIds}
        }).then(items => {
            if (!items) {
                res.status(400).send({
                    message: "item trying to be added does not exist"
                })
            }

            cart.setProducts(items).then(() => {
                console.log("Products succesfully added in the cart.")
                let cost = 0;
                const productsSelected = [];
                cart.getProducts().then(products => {
                    for (let i = 0; i < products.length; i++) {
                        cost = cost + products[i].cost;
                        productsSelected.push({
                            id: products[i].id,
                            name: products[i].name,
                            cost: products[i].cost
                        })
                    }

                    res.status(201).send({
                        id: cart.id,
                        productsSelected: productsSelected,
                        cost: cost
                    })

                })
            })

        })
    })
    .catch(err => {
        res.status(500).send({
            message: "Internal server error while finding by pk"
        })
    })
}

// Get the cart based on cartId
exports.getCart = (req, res) => {
    Cart.findByPk(req.params.cartId)
    .then(cart => {
        let cost = 0;
        const productsSelected = [];
        cart.getProducts().then(products => {
            for (let i = 0; i<products.length; i++) {
                cost = cost + products[i].cost;
                productsSelected.push({
                    id: products[i].id,
                    name: products[i].name,
                    cost: products[i].cost
                })
            }

            res.status(200).send({
                id: cart.id,
                productsSelected: productsSelected,
                cost: cost
            })

        })
    })
}