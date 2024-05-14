const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const jwtSecret="mycountrynameisIndiaandIndiaisbeautifull"
//creatng user
router.post("/createuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect Password').isLength({ min: 5 })]

    , async (req, res) => {
        console.log(req.body.name,
            req.body.password,
            req.body.email,
            req.body.location
        )
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);

        let secPassword = await bcrypt.hash(req.body.password,salt)
        try {
            await User.create({
                name: req.body.name,
                password: secPassword ,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true });

        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }
    })




//login
// router.post("/loginuser", [
//     body('email').isEmail(),
//     body('password', 'Incorrect Password').isLength({ min: 5 })]
//     , async (req, res) => {
//         let email = req.body.email;
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         // let email = req.body.email;
//         try {
//             let userData = await User.findOne({ email });
//             if (!userData) {
//                 return res.status(400).json({ errors: "try logging with correct credentials" })
//             }
//             if (req.body.password !== userData.password) {
//                 return res.status(400).json({ errors: "try logging with correct credentials" })
//             }
//             return res.json({ success: true });
//         } catch (error) {
//             console.log(error);
//             res.json({ success: false })
//         }
//     })













///////////////////
// router.post("/loginuser", [
//     body('email').isEmail(),
//     body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//         const { email, password } = req.body;
//         console.log("Received email:", email);
//         console.log("Received password:", password);
        
//         let userData = await User.findOne({ email });
//         console.log("Retrieved user data:", userData);

//         if (!userData) {
//             return res.status(400).json({ errors: "User not found" });
//         }
//         // Direct password comparison (not recommended)
//         const pwdCompare  = await bcrypt.compare(req.body.password,userData.password)
//         if (!pwdCompare) {
//             return res.status(400).json({ errors: "Incorrect password" });
//         }
//         // You should use a secure password hashing algorithm like bcrypt for comparison
//         // Example using bcrypt:
//         // const bcrypt = require('bcrypt');
//         // const match = await bcrypt.compare(password, userData.password);
//         // if (!match) {
//         //     return res.status(400).json({ errors: "Incorrect password" });
//         // }
//         const data= {
//             user:{
//                 id:userData.id
//             }
//         }
//        const authToken = jwt.sign(data,jwtSecret)
//         return res.json({ success: true,authToken:authToken });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
//     // "bcryptjs": "^2.4.3",
// });

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;

        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "User not found" });
        }

        const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Incorrect password" });
        }

        const authToken = jwt.sign({ user: { id: userData.id } }, jwtSecret);
        return res.json({ success: true, authToken: authToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});














//location
// Get logged in User details, Login Required.
// router.post('/getuser', fetch, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await User.findById(userId).select("-password") // -password will not pick password from db.
//         res.send(user)
//     } catch (error) {
//         console.error(error.message)
//         res.send("Server Error")

//     }
// })
// // Get logged in User details, Login Required.
// router.post('/getlocation', async (req, res) => {
//     try {
//         let lat = req.body.latlong.lat
//         let long = req.body.latlong.long
//         console.log(lat, long)
//         let location = await axios
//             .get("https://api.opencagedata.com/geocode/v1/json?q=" + lat + "+" + long + "&key=74c89b3be64946ac96d777d08b878d43")
//             .then(async res => {
//                 // console.log(`statusCode: ${res.status}`)
//                 console.log(res.data.results)
//                 // let response = stringify(res)
//                 // response = await JSON.parse(response)
//                 let response = res.data.results[0].components;
//                 console.log(response)
//                 let { village, county, state_district, state, postcode } = response
//                 return String(village + "," + county + "," + state_district + "," + state + "\n" + postcode)
//             })
//             .catch(error => {
//                 console.error(error)
//             })
//         res.send({ location })

//     } catch (error) {
//         console.error(error.message)
//         res.send("Server Error")

//     }
// })
module.exports = router