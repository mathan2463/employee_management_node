const EmployeeModel = require("../models/employee.model.js");
const ReqRes = require("../helper/request.response.validation.js");
// To Create User
exports.create = (req, res) => {
  var validReq = ReqRes.validateReqBody(req, res);
  if (validReq) {
    EmployeeModel.IsExistUserName(req.body.email, 0, (err, data1) => {
      if (data1.length == 0) {
        EmployeeModel.create(req.body, (err, data) => {
          ReqRes.printResponse(res, err, data);
        });
      }
      else {
        ReqRes.printResponse(res, { msg: "Email is aleady exist" }, null);
      }
    });
  }
};

exports.update = (req, res) => {
  var validReq = ReqRes.validateReqBody(req, res);
  if (validReq) {
    EmployeeModel.IsExistUserName(req.body.email, req.body.id, (err, data1) => {
      if (data1.length == 0) {
        EmployeeModel.update(req.body, (err, data) => {
          ReqRes.printResponse(res, err, data);
        });
      }
      else {
        ReqRes.printResponse(res, { msg: "Email is aleady exist" }, null);
      }
    });
  }
};

// To login
exports.login = (req, res) => {
  var validReq = ReqRes.validateReqBody(req, res);
  if (validReq) {
    if (req.body.hasOwnProperty('email') && req.body.hasOwnProperty('password')) {
          EmployeeModel.login(req.body.email, req.body.password, (err, data) => {
            ReqRes.printResponse(res, err, data);
          });
    } else {
      ReqRes.printResponse(res, { msg: "Email or Password is required" }, null);
    }
  }
};

exports.getAll = (req, res) => {
  EmployeeModel.getAll((err, data) => {
    ReqRes.printResponse(res, err, data);
  });
};
exports.remove = (req, res) => {
  EmployeeModel.remove(req.params.id, (err, data) => {
    ReqRes.printResponse(res, err, data);
  });
};
exports.view = (req, res) => {
  EmployeeModel.findById(req.params.id, (err, data) => {
    ReqRes.printResponse(res, err, data);
  });
};


