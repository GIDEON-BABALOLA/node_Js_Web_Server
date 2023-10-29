const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require(path.join(__dirname, "..", "model", "User"))
const authorizeUser = async (req, res)=>{
    const {username, password} = req.body
    if( !username || !password){ return res.status(400).json({"error" : "Enter your username and password"})}
    const foundUser = await User.findOne({username : username})
    if(!foundUser) {
         return res.status(401).json({"message": "User does not exist"})  //unAuthorized
        } 
        
    const match = await bcrypt.compare(password, foundUser.password);
    if(match){
        // create JWTs
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {"userInfo": 
            {"username" : foundUser.username, "roles": roles}
        }, //payload
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn : "120s"}
    )
    const refreshToken = jwt.sign(
        {"username" : foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn : "1d"} // If a token does not have expiresIn option the token does not expire, h s and d, m
)
// saving refresh token with currentuser
// http only cookie is not available to javascript and hackers

//Saving refresh token with current user
User.updateOne({_id : foundUser._id}, {refreshToken : refreshToken})
.then(()=>{
    res.cookie("jwt", refreshToken, {httpOnly : true, sameSite : "None", maxAge : 1000 * 60 * 60 * 24})
res.json({accessToken})
})
.catch((err)=>{
    res.send(err.message)
}) // store in memory, not secure in local storage as a frontend developer
    }
    else{
      return  res.status(401).json({"message" : "invalid credentials"})
    }
}
module.exports = authorizeUser
// https://youtu.be/nS_hg7dywB4?si=bi3BtWoILMfvPM5r