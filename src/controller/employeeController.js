"use strict";

// Declaration of modules
const globals = require("../utils/global.js");
const { createEmployee } = require("../service/paymentService.js");

/**
 * calculate the payment of the employees registered in the txt
 * @param {String} data The employee data txt
 */
exports.getEmployeePayment = (data) => {
    let employees = [];
    if (this.isValidData(data)) {
        let employeesData = this.splitDataEmployees(data);
        employeesData.forEach(element => {
            let employee = createEmployee(element);
            employees.push(employee);
        });
        return employees;
    }
    console.log("\n Oops!\n Employee data has an error")
    return null;
}

/**
 * validates that the file data has the correct structure
 * @param {String} data The employee data txt
 * @returns {Boolean}
 */
exports.isValidData = (data) => {
    if (data == "") return false
    let dataSplitReg = this.splitDataEmployees(data);
    let dataValidated = dataSplitReg != null ? dataSplitReg.length : 0;
    let dataSplit = data.split("\n").length;
    return dataSplit == dataValidated;
}

/**
 * separate information for each employee
 * @param {String} data The employee data txt
 * @returns {Array<String>} split employee data
 */
exports.splitDataEmployees = (data) => {
    return data.match(globals.regExpEmployee);
}
exports.print = (employees) => {
    employees.forEach(employee => {
        console.log("\nEl monto a pagar por " + employee.getName() + " es : " + employee.getSalary() + " USD");
    });
}