const allowedOrigins = require("../config/allowedOrigins");
const credentials = (req, res, next) =>{
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)){ 
          res.setHeader("Access-Control-Origin", true) //This is what cors is looking for
        }
        next()
}
module.exports = credentials
//High Performance Programming