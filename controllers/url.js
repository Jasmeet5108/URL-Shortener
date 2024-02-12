// Importing the shortid library to generate unique short IDs
const shortid = require('shortid');
// Importing the URL model to interact with the database
const URL = require("../models/url");

// Controller function to handle generating new short URLs
const handleGenereteNewShortUrl = async (req, res) => {
    // Extracting the request body
    const body = req.body;
    // Checking if the URL is provided in the request body
    if (!body.url) return res.status(400).json({ err: "URL is required" });

    // Generating a unique short ID using shortid library
    const shortId = shortid();

    // Creating a new URL entry in the database with the generated short ID,
    // original URL, and an empty visit history array
    await URL.create({
        shortId: shortId,
        redirectUrl: body.url,
        visitHistory: []
    });

    // Returning the generated short ID in the response
    return res.json({ id: shortId });
}

// Exporting the handleGenereteNewShortUrl function to be used in other files
module.exports = { handleGenereteNewShortUrl };


// In JavaScript, when you export a single function or variable from a module without using curly braces, you're making it the default export. However, in your controllers/url.js file, you're already exporting an object with handleGenereteNewShortUrl as a property. This means that to import it in another file using destructuring, you would use curly braces.
