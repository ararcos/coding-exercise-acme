"use strict";
const globals = require("../utils/global.js");
const Employee = require("../models/employee");
const WorkHour = require("../models/workHour");

exports.createEmployee = (data) => {
    let objEmployee = new Employee();
    let regWorkTime = new RegExp(globals.regWorkTime, "g");
    objEmployee.setName(data.split("=")[0] ? data.split("=")[0] : "undefine");
    data.match(regWorkTime).forEach(element => {
        objEmployee.getWorkHours().push(createWorkHour(element));
    });
    return objEmployee;
}


function createWorkHour(data) {
    let regDay = new RegExp(globals.regDay, "g");
    let regHour = new RegExp(globals.regHour, "g");
    let hours = data.match(regHour);
    let day = data.match(regDay);
    let objWorkHour = new WorkHour(day[0], hours[0], hours[1])
    getRanges();
    return objWorkHour;
}

function getRanges() {
    console.log(globals.rangesHours["rangeHours1"]);
}