

var express = require('express');
var router = express.Router();
const Employee = require("../controllers/employee.controller.js");

router.post("/login" , Employee.login);
router.post("/create" , Employee.create);
router.put("/update" , Employee.update);
router.delete("/delete/:id" , Employee.remove);
router.get("/view/:id" , Employee.view);
router.get("/getall" , Employee.getAll);

module.exports = router;