const express = require("express")
const path = require("path");
const {get, post, put, deleted, getEmployee, patch} = require(path.join(__dirname, "..", ".." ,"controllers", "employeesController"))
const ROLES_LIST = require(path.join(__dirname, "..", "..", "config","roles_list"))
const verifyRoles = require(path.join(__dirname, "..", "..", "middleware", "verifyRoles"))
const router = express.Router();
// const verifyJWT = require(path.join(__dirname, "..", ".." ,"middleware", "verifyJWT"))
router.route("/")
.get(get)
.post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), post)

router.route("/:id")
.put((verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), put))
.patch((verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), patch))
.delete(verifyRoles(ROLES_LIST.Admin),deleted)
.get(getEmployee)
module.exports = router