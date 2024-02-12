// Importing Mongoose module
const mongoose = require("mongoose");

// Defining the schema for URL model
const urlSchema = mongoose.Schema({
    // Field for short ID, must be unique and required
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    // Field for original URL to redirect to, must be required
    redirectUrl: {
        type: String,
        required: true
    },
    // Field for visit history, an array of objects with timestamp
    visitHistory: [
        // Sub-schema for timestamp, of type Number
        { timestamp: { type: Number } },
        // Adding timestamps for createdAt and updatedAt
        { timestamps: true }
    ]
});

// Creating the URL model based on the schema
const URL = mongoose.model("url", urlSchema);

// Exporting the URL model to be used in other files
module.exports = URL;
