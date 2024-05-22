



const express = require('express');
const cors = require('cors');
const app = express();

// const PORT = 5001;

const PORT = process.env.PORT || 5001;
const connectToDB = require('./db');

connectToDB();


// app.use(cors());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5174");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})




app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log(`Food Cart started at port:${PORT}`);
});




// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 5001;
// const connectToDB = require('./db');

// connectToDB();

// const allowedOrigins = [
//     'http://localhost:5174',
//     'https://food-cart-mern-server-5.onrender.com'
// ];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// }));

// app.use(express.json());
// app.use('/api',require("./Routes/CreateUser"));
// app.use('/api',require("./Routes/DisplayData"));
// app.use('/api',require("./Routes/OrderData"));

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(PORT, () => {
//     console.log(`Food Cart started at port:${PORT}`);
// });



// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 5001;
// const connectToDB = require('./db');

// connectToDB();

// const allowedOrigins = [
//     'https://food-cart-mern-server-5.onrender.com'
    
// ];

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// }));

// app.use(express.json());
// app.use('/api', require("./Routes/CreateUser"));
// app.use('/api', require("./Routes/DisplayData"));
// app.use('/api', require("./Routes/OrderData"));

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(PORT, () => {
//     console.log(`Food Cart started at port:${PORT}`);
// });
