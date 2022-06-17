/*
* This file will be used for the following purpose
* 1. Create the DB connection with the help of sequelize
* 2. Export all the functionalities of the model through this file.
* 3. One of the advantages of using an index.js file is that other files 
*   trying to import this file only need to provide the module name.
*   For example : require(./models); // No need to specify the file name index.js
*/ 

const config = require("../configs/db.configs");
const Sequelize  = require("sequelize");

// Creating the db connection
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.category = require("./category.model.js")(sequelize, Sequelize);
db.product = require("./product.model.js")(sequelize, Sequelize);
db.user = require("./user.model")(sequelize, Sequelize);
db.role = require("./role.model")(sequelize, Sequelize);
db.cart = require("./cart.model")(sequelize,Sequelize);

// Establish the relationship between user and role
db.role.belongsToMany(db.user, {
    through: "user_roles", // This is the table of user and roles relationship
    foreignKey: "roleId",
    otherKey: "userId"
});

db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})

// Establishing the relationship between cart and user
// One user can make multiple carts over his lifetime
db.user.hasMany(db.cart);

// Relationship between cart and products
db.product.belongsToMany(db.cart, {
    through: "cart_products",
    foreignKey: "productId"
})

db.cart.belongsToMany(db.product, {
    through: "cart_products",
    foreignKey: "cartId"
})

db.ROLES = ["user", "admin"];

module.exports = db;