const path = require("path");
const express = require("express")
const router = express.Router();
router.get("/index", (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "views", "index.html"))
});
router.get("/master", (req, res)=>{
    res.redirect(301, "/");
})
router.get("/new-page", (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "views", "new-page.html"))
})
router.get("/old-page", (req, res)=>{
    res.redirect(301, "/new-page")
})
router.get("/hello", (req, res, next)=>{
    console.log("Loaded hello world")
    next();
}, (req, res)=>{
    res.send("Welcome Home")
})
const one = (req, res, next)=>{
    console.log("one");
    next()
}
const two = (req, res, next)=>{
    console.log("two");
    next()
}
const three = (req, res)=>{
    console.log("three");
    res.send("finished ")
}
router.get("/chain", [one, two, three])
module.exports = router