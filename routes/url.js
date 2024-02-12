// Importing the Express module
const express = require("express");
// Importing the controller function to handle generating new short URLs
const { handleGenereteNewShortUrl } = require("../controllers/url");

// Creating a new router instance
const router = express.Router();

// Defining a route for handling POST requests to generate new short URLs
router.post("/", handleGenereteNewShortUrl);

// Exporting the router to be used in other files
module.exports = router;
