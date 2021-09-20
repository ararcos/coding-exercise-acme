"use strict";

const globals = require("../utils/global");
const Employee = require("../models/employee");
const { createEmployee } = require("../service/paymentService");

exports.getEmployeePayment = (data) => {
    let employees = [];
    if (isValidData(data)) {
        let employeesData = splitDataEmployees(data);
        employeesData.forEach(element => {
            employees.push(createEmployee(element));
        });
        return;
    }
    console.log("\n Oops!\n Employee data has an error")
    return;
}

function print(employees) {
    employees.forEach((element) => {})
}

function isValidData(data) {
    if (data == "") return false
    let dataSplitReg = splitDataEmployees(data);
    let dataValidated = dataSplitReg != null ? dataSplitReg.length : 0;
    let dataSplit = data.split("\n").length;
    return dataSplit == dataValidated;
}

function splitDataEmployees(data) {
    let regs = new RegExp(globals.regEx, "gm");
    return data.match(regs);
}