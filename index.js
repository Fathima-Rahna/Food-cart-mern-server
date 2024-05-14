// const express = require('express')
// const app  = express()

// const PORT =5001
// const mongoDB = require("./db")
// mongoDB();

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(PORT,()=>{
//     console.log(`project fair started at port:${PORT}`);
// })




const express = require('express');
const app = express();

const PORT = 5001;
const connectToDB = require('./db');

connectToDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(PORT, () => {
  console.log(`Project fair started at port:${PORT}`);
});




