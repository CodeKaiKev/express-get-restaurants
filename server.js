const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const port = 3000;
const restaurantRouter = require("./router/restaurants");


//Express routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/restaurants", restaurantRouter);




app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port http://localhost:3000/restaurants");
})