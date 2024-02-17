const express = require("express");
const router = express.Router();
const {handleUserSigup, handleUserLogin} = require("../controllers/user")

router.post("/", handleUserSigup);
router.post("/login", handleUserLogin);

module.exports = router;