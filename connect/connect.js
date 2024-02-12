// Importing Mongoose module
const mongoose = require("mongoose");

// Async function to connect to MongoDB
const connectToMongoDb = async (url) => {
    // Using Mongoose's connect method to connect to the MongoDB database
    // and returning the connection promise
    return mongoose.connect(url);
}

// Exporting the connectToMongoDb function to be used in other files
module.exports = { connectToMongoDb };

// This file simply exports an asynchronous function connectToMongoDb which takes a MongoDB connection URL as a parameter and connects to the MongoDB database using Mongoose's connect method. Let me know if you have any questions about it!