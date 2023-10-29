const jwt = require("jsonwebtoken")
const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({"message" : "You are unauthorized "});    
    }
    console.log(authHeader) // Bearer token
    const token = authHeader.split(" ")[1]
    console.log(token)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err){
                return res.sendStatus(403) // forbidden, invalid token
            }                             
               req.user = decoded.userInfo.username,
               req.roles = decoded.userInfo.roles
        console.log(req.user, `\t`, req.roles)
        console.log(decoded.userInfo.roles)
        }
    )
    next()
}
module.exports = verifyJWT