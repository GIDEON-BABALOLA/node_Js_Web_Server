const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    roles : {
        user : {
            type : Number,
            default : 2010
        },
        admin : Number,
        editor : Number
    },
    password : {
        type : String,
        required : true
    },
    refreshToken : String,
    timestamp: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
})
module.exports = mongoose.model("User", usersSchema)