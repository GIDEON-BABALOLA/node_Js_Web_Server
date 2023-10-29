const path = require("path");
const express = require("express")
const router = express.Router();
const logoutController = require(path.join(__dirname, "..", "controllers", "logoutController"))
router.get("/", logoutController);
module.exports = router