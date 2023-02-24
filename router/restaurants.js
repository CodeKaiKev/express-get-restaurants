const express = require("express");
//const app = express();
const {Restaurant} = require("../models/index");
const {sequelize} = require("../db");
const router = express.Router();
const {check, validationResult} = require("express-validator");

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

router.use(express.urlencoded({ extended: true }));

//Post for adding a new restaurant
router.post("/", [check("name", "Not Empty or white space").not().isEmpty().trim(), check("location", "Not Empty or white space").not().isEmpty().trim(), check("cuisine", "Not Empty or white space").not().isEmpty().trim(), check("name", "Has to be between 10 and 30").isLength({min: 10, max: 30})], async ( request, response) => {
    
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        response.json({error: errors.array()});
    }else {
        const newRestaurant = await Restaurant.create(request.body);
        response.json(Restaurant);
    }
 
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