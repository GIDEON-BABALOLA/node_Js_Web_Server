const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "..", 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, "..",'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname, "..", 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}
const logger = (req, res, next)=>{
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt")
    // console.log(req.path, req.method);
    next();
}
const authRegister = (req, res, next)=>{
    logEvents(`${req.body.username}\t${req.body.password} just registered`, "registerLog.txt")
    // console.log(req.body.username, req.body.password);
    next();
}
const authLogin = (req, res, next)=>{
    logEvents(`${req.body.username}\t${req.body.password} just logged in`, "loginLog.txt")
    // console.log(req.body.username, req.body.password);
    next();
}


module.exports = { logger, logEvents, authRegister, authLogin };
