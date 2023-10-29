const path = require("path"); 
const bcrypt = require("bcrypt")
const User = require(path.join(__dirname, "..", "model", "User"))
const handleNewUser = async (req, res) => {
    const {username, password} = req.body
    const { role } = req.query
    console.log(role)
    // Every Body Is A User
    if( !username || !password){ return res.status(400).json({"error" : "Enter your username and password"})}
    const duplicate = await User.findOne({username : username})
    if (duplicate) { 
        return res.sendStatus(409)  // conflict
     } ;
    try {
        //encrypt the password
const hashedPwd = await bcrypt.hash(password, 10);
// create and store new user
switch (role) {
    case "admin":
        const newAdmin = await User.create({
            "username" : username,
             "roles" : { "user": 2010, "editor": 2020, "admin": 2030},
             "password" : hashedPwd,
              })
              console.log(newAdmin)
        break;
        case "editor":
            const newEditor = await User.create({
                "username" : username,
                 "roles" : { "user": 2010, "editor": 2020},
                 "password" : hashedPwd,
                  })
                  console.log(newEditor)
        break;
    default:
        const newUser = await User.create({
            "username" : username,
            //  "roles" : { "user": 2010}, default already in schema
             "password" : hashedPwd,
              })
              console.log(newUser);
        break;
}
res.status(201).json({"success" : `A new user ${username} was created`})
    } catch(err){
        res.status(500).json({"message" : err.message})
    }
}
module.exports = handleNewUser
