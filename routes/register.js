const express = require("express");
const router = express.Router();
const path = require("path");
const registerController = require(path.join(__dirname, "..", "controllers", "registerControllers"))
const { authRegister} = require(path.join(__dirname,"..","middleware", "logEvents"))
router.post("/", authRegister, registerController)
module.exports = router