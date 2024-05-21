const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');
// const stripe = require('stripe')('sk_test_51PGaGXSDnZaPIrbL6tPQE8llqvbnzcutmVTTfgveH3f6cab9HTjad10y5PbBJTmWGwoK1EAzwEvjPTX3RAp9WPOV003X7jVAYG');



//for cart
router.post('/orderData',async (req, res) => {

    // let data = req.body.order_data
    // await data.splice(0, 0, { Order_date: req.body.order_date });
    let data = req.body.order_data || []; // Initialize as empty array if undefined
    data.splice(0, 0, { Order_date: req.body.order_date });
    console.log("1231242343242354",req.body.email)


     let eId = await Order.findOne({'email':req.body.email})
     console.log(eId);
     if(eId === null){
        
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)

            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})

            })
        
    } catch (error) {
        console.error(error.message);
        res.send("Server Error");
    }}

    else{
        try{
            await Order.findOneAndUpdate({ email:req.body.email},
                { $push:{order_data:data}}).then(()=>{
                    res.json({success:true})
                })

                
            
        }catch(error){
            console.log(error.message);
            res.send("Server Error",error.message);
        }
    }
   
});


router.post('/orderData', async (req, res) => {
    try {
        
        const { order_data, order_date, email } = req.body;

        
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        
        if (!order_data) {
            return res.status(400).json({ success: false, message: "Order data is required." });
        }

        // Insert Order_date into the beginning of the order_data array
        order_data.unshift({ Order_date: order_date });

      
        let existingOrder = await Order.findOne({ email });

        if (!existingOrder) {
            
            await Order.create({
                email,
                order_data: [order_data]
            });
        } else {
           
            await Order.findOneAndUpdate({ email }, { $push: { order_data } });
        }

        res.json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});




//for order

router.post('/myOrderData',async (req,res)=>{
  
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    
});




// const router = express.Router();

// router.post('/orderData', async (req, res) => {
//     // Extract order data and order date from the request body
//     const { order_data, order_date, email } = req.body;

//     // Initialize data as an empty array if it's undefined
//     let data = order_data || [];

//     // Insert Order_date into the beginning of the data array
//     data.splice(0, 0, { Order_date: order_date });

//     try {
//         // Check if there is an existing order with the given email
//         let existingOrder = await Order.findOne({ email });

//         if (!existingOrder) {
//             // If no existing order, create a new order
//             await Order.create({
//                 email,
//                 order_data: [data]
//             });
//         } else {
//             // If existing order, push the new order data
//             existingOrder.order_data.push(data);
//             await existingOrder.save();
//         }

//         // Send success response
//         res.json({ success: true });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Server Error");
//     }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Orders'); // Import the Order model

// router.post('/orderData', async (req, res) => {
//     // Extract order data and order date from the request body
//     const { order_data, order_date, email } = req.body;

//     // Initialize data as an empty array if it's undefined
//     let data = order_data || [];

//     // Insert Order_date into the beginning of the data array
//     data.splice(0, 0, { Order_date: order_date });

//     try {
//         // Check if there is an existing order with the given email
//         let existingOrder = await Order.findOne({ email });

//         if (!existingOrder) {
//             // If no existing order, create a new order
//             await Order.create({
//                 email,
//                 order_data: [data]
//             });
//         } else {
//             // If existing order, push the new order data
//             existingOrder.order_data.push(data);
//             await existingOrder.save();
//         }

//         // Send success response
//         res.json({ success: true });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Server Error");
//     }
// });

// module.exports = router;

///////payment stripe
// const express = require('express');
// const router = express.Router();
// const stripe = require('stripe')('sk_test_51PGaGXSDnZaPIrbL6tPQE8llqvbnzcutmVTTfgveH3f6cab9HTjad10y5PbBJTmWGwoK1EAzwEvjPTX3RAp9WPOV003X7jVAYG');

// router.post('/payment', async (req, res) => {
//     try {
//         const { amount, currency, token } = req.body;

//         // Create a charge using the Stripe API
//         const charge = await stripe.charges.create({
//             amount: amount * 100, // Convert amount to cents
//             currency: currency,
//             source: token, // Token generated by Stripe.js
//             description: 'Payment for your order'
//         });

//         // Handle successful payment
//         console.log('Payment successful:', charge);
//         res.status(200).json({ success: true, message: 'Payment successful' });
//     } catch (error) {
//         // Handle payment errors
//         console.error('Payment error:', error.message);
//         res.status(500).json({ success: false, message: 'Payment failed' });
//     }
// });

// module.exports = router;
module.exports = router;