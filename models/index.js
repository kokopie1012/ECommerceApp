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

module.exports = db;