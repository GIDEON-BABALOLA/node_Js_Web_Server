const { logEvents} = require("./logEvents")
exports.errorHandler = (err, req, res, next)=>{
    console.log(err.stack);
    res.status(500).send(err.message)
    logEvents(`${err.name}: ${err.message}`, "errLog.txt")
    next();
}