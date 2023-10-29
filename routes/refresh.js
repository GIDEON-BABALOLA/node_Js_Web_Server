const path = require("path");
const express = require("express")
const router = express.Router();
const refreshTokenController = require(path.join(__dirname, "..", "controllers", "refreshTokenController"))
router.get("/", refreshTokenController);
module.exports = router