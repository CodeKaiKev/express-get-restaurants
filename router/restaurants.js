const express = require("express");
//const app = express();
const {Restaurant} = require("../models/index");
const {sequelize} = require("../db");
const router = express.Router();
//const {check, validationResult} = require("express-validator");

//TODO: Create your GET Request Route Below: 
router.get("/", async (request, response)  => {
    try {
        const allRes = await Restaurant.findAll();
        response.json(allRes);
    }catch (err) { 
        res.status(500).send({err: err.message});
    }
})
router.get("/:id", async (request, response)  => {
    const restaurant = await Restaurant.findByPk(request.params.id);
    response.json({restaurant});
})

router.use(express.json());

//Post for adding a new restaurant
router.post("/", async ( request, response) => {
    
    const newRestaurant = await Restaurant.create(request.body);
    response.json(Restaurant);
})
//Put for updating a new restaurant
router.put("/:id", async (request, response) => {
    const newRestaurant = request.body;
    await Restaurant.update(
        {name: newRestaurant.name, location: newRestaurant.location, cuisine: newRestaurant.cuisine},
        {where: {id: request.params.id}}
        )

    //const res = await Restaurant.findAll();
    response.json(Restaurant);
})
//Deleting a restaurant based on ID
router.delete("/:id", async (request, response) => {
    const deletedRestaurant = await Restaurant.destroy({
        where: {
            id: request.params.id
        }
    })
    response.json(Restaurant);
})

module.exports = router;