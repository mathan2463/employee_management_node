const con = require("../helper/db.js");
const md5 = require('md5');
var cDateTime = require("../utils/generic.js");

const EmployeeModel = function (obj) {
  this.id = obj.id;
  this.name = obj.name ? obj.name : '';
  this.password = obj.password;
  this.newpassword = obj.newpassword ? obj.newpassword : '';
  this.email = obj.email ? obj.email : '';
  this.phone = obj.phone ? obj.phone : '';
  this.address = obj.address ? obj.address : '';
  this.type = obj.type ? obj.type : '';
  this.Created = cDateTime.getDateTime();
  this.Modified = cDateTime.getDateTime();
};
// To Create
EmployeeModel.create = (objVal, result) => {
  obj = new EmployeeModel(objVal);
  obj.password = obj.password ? md5(obj.password) : '';
  var sql = ``;
  var sql = `insert into employee(name, email, password, phone, address, type, created) values`;
  sql += `('${obj.name}','${obj.email}', '${obj.password}','${obj.phone}','${obj.address}','${obj.type}','${obj.Created}' ) `;
  //console.log("sql=" + sql)
  con.query(sql, (err, res) => {
    if (err) {
      return result(err, null);
    }
    result(null, { id: res.insertId, ...obj });
  });
};
// To IsExistUserName
EmployeeModel.IsExistUserName = (email, id, result) => {
  var sql = `Select id,email from employee where IsDeleted=0 and email='${email}' `;
  
  if (id > 0) {
    sql += ` and id<>${id}`;
  }
  con.query(sql, (err, res) => {
    if (err) {
      return result(err, null);
    }
    return result(null, res);
  });
}

// To login
EmployeeModel.login = (email, password, result) => {
  var password = md5(password);
  var query = `SELECT * FROM employee WHERE IsDeleted = 0 AND type = 1 AND email = '${email}' AND password = '${password}'`; 
  //console.log(query);
  con.query(query, (err, res) => {      
    if (err) {
      return result(err, null);
    }
    if (res.length) {
       var logininfo = res[0];  
       return result(null, {employee: logininfo, accessToken: md5(email)});
    } else {
      return result({ msg: "Email or password incorrect" }, null);
    }
  });
};

// To findById
EmployeeModel.findById = (id, result) => {
  con.query(`SELECT *, CASE type 
WHEN 1 THEN 'Admin'
WHEN 2 THEN 'Senior Developer'
WHEN 3 THEN 'Manager'
WHEN 4 THEN 'Support Team' 
ELSE '-' end typeName
FROM employee WHERE IsDeleted = 0 AND id = ${id}`, (err, res) => {
    if (err) {
      return result(err, null);
    }
    if (res.length) {
      return result(null, res[0]);
    }
    return result({ msg: "Employee not found" }, null);
  });
};

// To getAll
EmployeeModel.getAll = (result) => {
  con.query(`SELECT *, CASE type 
  WHEN 1 THEN 'Admin'
  WHEN 2 THEN 'Senior Developer'
  WHEN 3 THEN 'Manager'
  WHEN 4 THEN 'Support Team' 
  ELSE '-' end typeName FROM employee WHERE IsDeleted = 0`, (err, res) => {
    if (err) {
      return result(err, null);
    }
    return result(null, res);
  });
};

// To update
EmployeeModel.update = (obj, result) => {
  obj = new EmployeeModel(obj);
  if(obj.newpassword != ""){
    var sql = `UPDATE employee SET name = ?,email =?, password=?, phone=?, address=?, type=?, Modified = ? WHERE id = ?`
    obj.password = md5(obj.newpassword);
    var values = [
      obj.name, obj.email, obj.password, obj.phone, obj.address, obj.type, obj.Modified, obj.id
    ]
  }else{
    var sql = `UPDATE employee SET name = ?,email =?, phone=?, address=?, type=?, Modified = ? WHERE id = ?`
    obj.password = md5(obj.password);
    var values = [
      obj.name, obj.email, obj.phone, obj.address, obj.type, obj.Modified, obj.id
    ]
  }
    con.query(sql, values, function (err, res) {
      if (err) {
        return result(err, null);
      }else{
        result(null, res);
      }
    });
};
// To Delete
EmployeeModel.remove = (id, result) => {

  var sql = `UPDATE employee SET IsDeleted = 1 WHERE id = ${id}`;
  con.query(sql, (err, res) => {
    if (err) {
      return result(err, null);
    }
    if (res.affectedRows == 0) {
      return result({ msg: "Employee not found" }, null);
    }
    result(null, res);
  });
};
module.exports = EmployeeModel;