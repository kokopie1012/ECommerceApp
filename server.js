const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Initialising the database
const db = require("./models");
const Category = db.category;
const Product = db.product;
const Role = db.role;

// Setting the one to many relationship with product
Category.hasMany(Product); // This will create a foreign key column (categoryId) in Product

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

    // Adding roles
    Role.create({
        id: 1,
        name:"user"
    });
    Role.create({
        id: 2,
        name:"admin"
    })
};

// Importing the routes and using them
require("./routes/category.routes")(app);
require("./routes/product.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/cart.routes")(app);


app.listen(serverConfig.PORT, () => console.log(`App running on : ${serverConfig.PORT}`))
