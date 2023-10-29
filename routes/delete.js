const express = require("express")
const router = express.Router()
const path = require("path")
const deleteController = require(path.join(__dirname, "..", "controllers", "deleteController"))
router.delete("/", deleteController)
module.exports = router;