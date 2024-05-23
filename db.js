// const mongoose = require('mongoose');
// const mongoURI ='mongodb+srv://gofood:rahna@cluster0.fznakuv.mongodb.net/foodmern?retryWrites=true&w=majority&appName=Cluster0'
// const mongoDB = async()=>{
// await mongoose.connect(mongoURI,{ useNewUrlParser:true },(err,result)=>{
//    if(err)  console.log(err);
//    else{
//     console.log("connected with server");
//    }
// });
// }


// module.exports=mongoDB;


///corect///////////////////////////////////
// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://gofood:rahna@cluster0.fznakuv.mongodb.net/foodmern?retryWrites=true&w=majority&appName=Cluster0';

// const connectToDB = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log('Connected to MongoDB Atlas');
//     const fetch_data = await mongoose.connection.db.collection("food_items");
//     fetch_data.find({}).toArray(async function(err,data){
//         const food_category = await  mongoose.connection.db.collection("food_category");
//         food_category.find({}).toArray(async function(err,catData){
//             if(err) console.log(err);
//             else{
//                 global.food_items = data;
//                 global.food_category =catData;
//             }
//         })
//         // if(err) console.log(err);
//         // else {
//         //     global.food_items =data;
//         //     console.log(global.food_items);
//         // }
//     })
//   } catch (error) {
//     console.error('Connection to MongoDB Atlas failed:', error);
//   }
// };

// module.exports = connectToDB;





// // const jwt = require('jsonwebtoken');
// require('dotenv').config();
// const mongoose = require('mongoose');
// // const mongoURI = process.env.MONGO_URI;
// // const jwtSecret = process.env.JWT_SECRET;

// //////////////////////////////
// console.log(process.env.MONGO_URI);
// console.log(process.env.JWT_SECRET);

// // const mongoURI = 'mongodb+srv://gofood:rahna@cluster0.fznakuv.mongodb.net/foodmern?retryWrites=true&w=majority&appName=Cluster0';
// // const mongoose = require('mongoose');

// // const connectToDB = async () => {
// //   try {
// //    ` await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });`
// //     console.log('Connected to MongoDB Atlas');
// //     // Rest of your code...
// //   } catch (error) {
// //     console.error('Connection to MongoDB Atlas failed:', error);
// //   }
// // };

// // module.exports = connectToDB;


// const connectToDB = async () => {
//   try {
//     // await mongoose.connect(mongoURI);
//     await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
//     console.log('Connected to MongoDB Atlas');
//     const foodItemsCollection = mongoose.connection.db.collection("food_items");
//     const foodCategoryCollection = mongoose.connection.db.collection("food_category");
    
//     const foodItemsPromise = foodItemsCollection.find({}).toArray();
//     const foodCategoryPromise = foodCategoryCollection.find({}).toArray();
    
//     const [foodItems, foodCategory] = await Promise.all([foodItemsPromise, foodCategoryPromise]);

//     global.food_items = foodItems;
//     global.food_category = foodCategory;

//     console.log('Fetched food items:', foodItems);
//     console.log('Fetched food categories:', foodCategory);
//   } catch (error) {
//     console.error('Connection to MongoDB Atlas failed:', error);
//   }
// };

// module.exports = connectToDB;



const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Atlas');

    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodCategoryCollection = mongoose.connection.db.collection("food_category");

    const foodItemsPromise = foodItemsCollection.find({}).toArray();
    const foodCategoryPromise = foodCategoryCollection.find({}).toArray();

    const [foodItems, foodCategory] = await Promise.all([foodItemsPromise, foodCategoryPromise]);

    global.food_items = foodItems;
    global.food_category = foodCategory;

    console.log('Fetched food items:', foodItems);
    console.log('Fetched food categories:', foodCategory);
  } catch (error) {
    console.error('Connection to MongoDB Atlas failed:', error);
  }
};

module.exports = connectToDB;



























// const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://gofood:rahna@cluster0.fznakuv.mongodb.net/foodmern?retryWrites=true&w=majority&appName=Cluster0';

// const connectToDB = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log('Connected to MongoDB Atlas');
//     const fetch_data = await mongoose.connection.db.collection("food_items");
//     const data = await fetch_data.find({}).toArray();
//     return data; // Return the fetched data
//   } catch (error) {
//     console.error('Connection to MongoDB Atlas failed:', error);
//     throw error; // Rethrow the error to be caught by the caller
//   }
// };

// module.exports = connectToDB;
