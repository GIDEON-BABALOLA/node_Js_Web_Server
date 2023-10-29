require("dotenv").config()
const mongoose = require("mongoose")
const connectDB = async () =>{
    try{
   await mongoose.connect("mongodb://127.0.0.1:27017/employeesDB", {
useNewUrlParser: true,
useUnifiedTopology:true }
)
   console.log(process.env.DATABASE_URI)
    }catch(err){
        console.error(err)
    }
}

module.exports = connectDB;