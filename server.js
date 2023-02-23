const express = require("express");
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (request, response)  => {
    const res = await Restaurant.findAll();
    response.json(res);
})
app.get("/restaurants/:id", async (request, response)  => {
    const restaurant = await Restaurant.findByPk(request.params.id);
    response.json({restaurant});
})

app.use(express.json());

//Post for adding a new restaurant
app.post("/restaurants", async ( request, response) => {
    
    const newRestaurant = await Restaurant.create(request.body);
    response.json(Restaurant);
})
//Put for updating a new restaurant
app.put("/restaurants/:id", async (request, response) => {
    const newRestaurant = request.body;
    await Restaurant.update(
        {name: newRestaurant.name, location: newRestaurant.location, cuisine: newRestaurant.cuisine},
        {where: {id: request.params.id}}
        )

    //const res = await Restaurant.findAll();
    response.json(Restaurant);
})
//Deleting a restaurant based on ID
app.delete("/restaurants/:id", async (request, response) => {
    const deletedRestaurant = await Restaurant.destroy({
        where: {
            id: request.params.id
        }
    })
    response.json(Restaurant);
})

// app.listen(port, () => {
//     sequelize.sync();
//     console.log("Your server is listening on port http://localhost:" + port + "/restaurants");
// })
app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port http://localhost:3000/restaurants");
})