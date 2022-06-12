const db = require("../models");
const Category = db.category;

const validateCategoryRequest = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Name of the category can't be empty!"
        });
        return;
    }
    next();
}

const validateProductRequest = (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "Name of the product can't be empty!"
        });
        return;
    }

    if (!req.body.cost) {
        res.status(400).send({
            message: "Cost of the product can't be empty!"
        });
        return;
    }

    if (req.body.categoryId) {
        Category.findByPk(req.body.categoryId).then(category => {
            if (!category) {
                res.status(400).send({
                    message: `Category Id passed is not available : ${req.body.categoryId}`
                });
                return;
            }
            next();
        }).catch(err => {
            res.status(500).send({
                message: "Some internal error while storing the product."
            })
        })
    } else {
        res.status(400).send({
            message: "Category id passed is not available."
         });
         return;
    }
}

const validateCategoryPassedInReqParams =(req, res) => {
    const categoryId = req.params.categoryId;

    if (categoryId) {
        Category.findByPk(categoryId).then(category => {
            if (!category) {
                res.status(400).send({
                    message: "Category id passed is not available."
                })
            }
            next();
        }).catch(err => {
            res.status(500).send({
                message:"Internal server error while fetching category by id."
            })
            return;
        })
    } else {
        res.status(400).send({
            message: "Category id passed is not available."
        })
        return;
    }

}

module.exports = {
    validateCategoryRequest: validateCategoryRequest,
    validateProductRequest: validateProductRequest,
    validateCategoryPassedInReqParams: validateCategoryPassedInReqParams
}