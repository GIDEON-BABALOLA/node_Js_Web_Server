const path = require("path");
const express = require("express")
const router = express.Router();
router.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "index.html"))
});
router.get("/test", (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "views", "subdir", "test.html"))
});
module.exports = router;
// https://mui.com/material-ui/react-autocomplete/