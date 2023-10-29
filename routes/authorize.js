const path = require("path");
const express = require("express")
const router = express.Router();
const authController = require(path.join(__dirname, "..", "controllers", "authController"))
const {authLogin} = require(path.join(__dirname, "..", "middleware", "logEvents"))
router.post("/", authLogin, authController);
module.exports = router