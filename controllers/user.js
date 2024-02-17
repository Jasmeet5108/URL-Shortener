const User = require("../models/user"); // Importing User model

// Function to handle user signup
const handleUserSigup = async (req, res) => {
    const { name, email, password } = req.body; // Extracting user details from request body
    await User.create({
        name,
        email,
        password
    }); // Creating a new user in the database
    return res.redirect("/"); // Redirecting user to the home page after signup
}

// Function to handle user login
const handleUserLogin = async (req, res) => {
    const { email, password } = req.body; // Extracting login credentials from request body
    const user = await User.findOne({ email, password }); // Finding user in the database
    if (!user) {
        return res.render("login", { error: "Invalid username or password" }); // Rendering login page with error message if user not found
    } else {
        return res.redirect("/"); // Redirecting user to the home page after successful login
    }
}

// Function to render URL shortener page
const urlShortnerPage = async (req, res) => {
    const allUrls = await URL.find({}); // Fetching all URLs from the database
    const extraData = {
        urls: allUrls,
        name: "Jasmeet"
    }; // Additional data to pass to the view
    res.render("home", extraData); // Rendering the home page with URL data
}

module.exports = { handleUserSigup, handleUserLogin, urlShortnerPage }; // Exporting functions for use in other modules
