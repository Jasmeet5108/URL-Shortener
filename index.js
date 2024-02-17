const express = require("express"); // Importing Express.js framework for handling HTTP requests
const { connectToMongoDb } = require("./connect/connect"); // Importing function to connect to MongoDB
const URL = require("./models/url"); // Importing URL model for MongoDB schema
const path = require("path");

const urlRoute = require("./routes/url"); // Importing URL route handlers
const staticRoute = require("./routes/staticRouter"); // Importing static route handlers
const userRoute = require("./routes/user"); // Importing user route handlers
const { urlShortnerPage } = require("./controllers/user"); // Importing URL shortener page controller

// Creating an Express application instance
const app = express();
const port = 8001; // Port number on which the server will listen

// Route for serving the URL shortener page
app.get("/test", urlShortnerPage);

// Connecting to MongoDB database
connectToMongoDb("mongodb://localhost:27017/short-url").then(() => { console.log(`MongoDB Connected`) });

// Setting view engine to ejs and views directory path
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Using URL route handlers for requests starting with "/url"
app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

// Handling GET requests with short IDs to redirect to original URLs
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId; // Extracting short ID from request parameters
    // Finding the URL entry with the given short ID and updating its visit history
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push:
            {
                visitHistory: {
                    timestamp: Date.now()
                }
            },
        });
    // Redirecting to the original URL associated with the short ID
    res.redirect(entry.redirectUrl);
});

// Starting the server and listening on the specified port
app.listen(port, () => { console.log(`App listening on port:${port}`) });
