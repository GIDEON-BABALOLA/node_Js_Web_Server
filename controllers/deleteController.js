const path = require("path");
const User = require(path.join(__dirname, "..", "model", "User"))
const deleteController = async (req, res) => {
const { username } = req.body;
console.log(username)
if( !username) return res.status(400).send({"message" : "Enter your username"})
const userToBeDeleted = await User.findOne({username : username})
if(!userToBeDeleted){
    return res.status(401).send({"message": "user not found"})
}  
try{
await User.deleteOne({username : username})
res.status(200).json({"message": `user ${username} has been deleted`})
}catch(error){
    console.error("Error in deleting user:", error);
    res.sendStatus(500); // Internal Server Error
}
// const userToBeDeleted = usersDB.users.filter(person => person.username !== username);
}
module.exports = deleteController;