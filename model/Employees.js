const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeesSchema = new Schema({
    id : Number,
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    timestamp: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },

})
module.exports = mongoose.model("Employee", employeesSchema)
// Mongoose automatically looks for the plural, lowercased version of your model name