const path = require("path");
const User = require(path.join(__dirname, "..", "model", "User"))
const handleLogOut = async (req, res) => {
    //on client, also delete the access token, on the memory of the client application
    const cookies = req.cookies
    if(!cookies?.jwt){ return res.sendStatus(204)} //No Content
    const refreshToken = cookies.jwt;
    try {
    const foundUser = await User.findOne({refreshToken : refreshToken})
    console.log(foundUser.name)
    if(!foundUser) {
        res.clearCookie("jwt", {httpOnly : true, sameSite: "None"})
        //  return res.status(204).json({"message": "successfully logged out"})  //successful but no content
        return res.sendStatus(204)
        } 
        //Delete refeshToken in the database
//Removing the person with the refresh token
   await User.updateOne({_id : foundUser._id}, {refreshToken: ""})
    res.clearCookie("jwt", {httpOnly : true, sameSite  : "None"}) //secure : true, uses https connection
    res.sendStatus(204)
    } catch(error){
        console.error("Error in logging out user:", error);
        res.sendStatus(500); // Internal Server Error
    }
}
module.exports = handleLogOut
// https://youtu.be/nS_hg7dywB4?si=bi3BtWoILMfvPM5r
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1pa2UiLCJpYXQiOjE2OTc2MTAwMTYsImV4cCI6MTY5NzYxMDA0Nn0.ErhblUK1_ken3BSF-JwVnhTe2D9x93zq-sRRubUVK7E