const jwt = require("jsonwebtoken");
const path = require("path")
const User = require(path.join(__dirname, "..", "model", "User"))
const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
  
    if(!cookies?.jwt){ return res.sendStatus(401)} //Unauthorized
    // console.log(cookies.jwt)
    const refreshToken = cookies.jwt;
    // const foundUser = usersDB.users.find( person =>  person.refreshToken === refreshToken  )
    try {
    const foundUser = await User.findOne({refreshToken : refreshToken})
    // console.log(foundUser)
    if(!foundUser) {
         return res.status(403).json({"message": "Your one day session has timed out"})  //forbidden
        } 
        //evaluate jwt
        const roles = Object.values(foundUser.roles);
        // console.log(roles)
jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
        if(err || foundUser.username !== decoded.username){
            return res.sendStatus(403) //forbidden
        }
        const accessToken = jwt.sign( 
            {"userInfo":{"username" : decoded.username, "roles": roles}},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "120s"}
        )
        res.json({accessToken})
    }
)}
catch(error){
    console.error("Error finding user:", error);
    res.sendStatus(500); // Internal Server Error
}
}
module.exports = handleRefreshToken
// https://youtu.be/nS_hg7dywB4?si=bi3BtWoILMfvPM5r
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpYXQiOjE2OTc2MTAwMTYsImV4cCI6MTY5NzYxMDA0Nn0.ErhblUK1_ken3BSF-JwVnhTe2D9x93zq-sRRubUVK7E