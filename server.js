require("dotenv").config();
const express = require("express");
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3500;
const mongoose = require("mongoose")
const favicon = require('express-favicon');
const cors =  require("cors");  
const credentials = require("./middleware/credentials")
const corsOptions = require("./config/corsOptions")
const cookieParser = require("cookie-parser")
// routes
const Router = require("./routes/subdir");
const rootRouter = require("./routes/root");
const  employeeRouter  =  require("./routes/api/employees")
const registerRouter = require("./routes/register")
const authorizeRouter = require("./routes/authorize")
const deleteRouter = require("./routes/delete")
const refreshRouter = require("./routes/refresh")
const logoutRouter = require("./routes/logout");
const connectDB = require(path.join(__dirname, "config", "dbConn"));
connectDB();
const { connect } = require("http2");
const { errorHandler } = require(path.join(__dirname,"middleware", "errorHandler.js"))
//built in middleware to handle static files
app.use("/", express.static(path.join(__dirname, "public")));
app.use("/subdir",express.static(path.join(__dirname, "public")));

const {logger} = require(path.join(__dirname,"middleware", "logEvents"))
const verifyJWT = require(path.join(__dirname,"middleware", "verifyJWT"))
//Cross Origin Resource Sharing
//Cross Origin Resource sharing
app.use(credentials)
app.use(cors(corsOptions))
//built in middleware to collect form data
app.use(express.urlencoded( {extended : true}));
//build in middleware for json
app.use(express.json());
//middleware for cookies
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'views', "index.html")))
// custom middleware
app.use(logger);
app.use("/register", registerRouter);
app.use("/auth", authorizeRouter);
app.use("/refresh", refreshRouter);
app.use("/delete", deleteRouter);
app.use("/logout", logoutRouter);
app.use("/", rootRouter);
app.use(verifyJWT)
app.use("/subdir", Router)
app.use("/employees", employeeRouter)
// app.use does not accept regex in older versions of regex
app.all("*", (req, res)=>{
    res.status(404);
    if(req.accepts("html")){
      res.sendFile(path.join(__dirname, "views", "404.html"))
    }else if(req.accepts("json")){
      res.json({error : "404 not found"})
    }else{
      res.type("txt").send("error: 404 not found")
    }
})
//we do not want to listen to requests if our connection fails - the code below describes that
// error handler for internal server error
app.use(errorHandler);
mongoose.connection.once("open", ()=>{
  console.log("connected to mongoDB successfully")
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})

//Three types of moddleware
//Built in middleware
//custom middleware
//third-party middleware
//To use refresh token secret and access token secret, go to terminal
// type node
// type require("crypto").randomBytes(64).toString("hex")
//when trying to login with axios from react, always use this flag
// credentials : "include",
