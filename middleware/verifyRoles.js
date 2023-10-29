const verifyRoles = (...allowedRoles) => {
return (req, res, next) => {
    if(!req?.roles){
     return res.sendStatus(401);
     } //unAuthorized
    const { roles } = req
    const rolesArray = [...allowedRoles];
    console.log(rolesArray)
    console.log(req.roles)
    console.log(roles)
    const result = roles.map(role => rolesArray.includes(role)) // This return a boolean value
    .find(val => val === true)
    if(!result) return res.sendStatus(401) //unAuthorized
    next()
}
}
module.exports = verifyRoles 