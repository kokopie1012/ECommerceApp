const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Initialising the database
const db = require("./models");
const Category = db.category;

console.log(Category);
db.sequelize.sync({force: true}).then(()=> {
    console.log("Tables dropped and recreated.");
    init();
})

function init() {
    let categories = [
        {
            name: "Electronics",
            description: "This category will contain all the electronic products."
        },
        {
            name: "KitchenItems",
            description: "This category will contain all the kitchen Items."
        }
    ];

    Category.bulkCreate(categories).then(categories => {
        console.log("Category table is initialised.");
    }).catch(err => {
        console.log("Error in initialising the category table.")
    }) 
};

// Importing the routes and using them
require("./routes/category.routes")(app);
require("./routes/product.routes")(app);

app.listen(serverConfig.PORT, () => console.log(`App running on : ${serverConfig.PORT}`))
