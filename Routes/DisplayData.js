const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        // console.log(global.food_items);
        // console.log(global.food_category);
        res.send({ foodItems: global.food_items, foodCategory: global.food_category });
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }
});

module.exports = router;
