"use strict";

// Declaration of modules
const globals = require("../utils/global.js");
const Employee = require("../models/employee.js");
const WorkDay = require("../models/workDay.js");
const utils = require("../utils/utils.js");

/**
 * creates an instance of the Employee object
 * @param {String} data employee data
 * @returns {Employee} intance of Employee
 */
exports.createEmployee = (data) => {
    let objEmployee = new Employee();
    objEmployee.setName(data.split("=")[0] ? data.split("=")[0] : "undefine");
    data.match(globals.regExpWorkTime).forEach(element => {
        objEmployee.getWorkDays().push(this.createWorkDay(element));
    });
    objEmployee.setSalary(getSalaryEmployee(objEmployee.getWorkDays()));
    return objEmployee;
}

/**
 * creates an instance of the working day object
 * @param {String} data information about hours worked
 * @returns {WorkDay} intance of WorkHour
 */
exports.createWorkDay = (data) => {
    const hours = data.match(globals.regExpHour);
    const day = data.match(globals.regExpDay);
    let objWorkDay = new WorkDay(day[0])
    objWorkDay.setPrices(utils.getPriceDay(objWorkDay.getDay()));
    const initHour = utils.parseDay(objWorkDay.getDay(), hours[0]);
    let endHour = utils.parseDay(objWorkDay.getDay(), hours[1]);
    objWorkDay.setInitHour(initHour)
    objWorkDay.setEndHour(utils.validatedDate(initHour, endHour));
    objWorkDay.setPay(this.calculatePayWork(objWorkDay));
    return objWorkDay;
}

/**
 * Calculates the pay that an employee should receive for the hours worked in the day.
 * @param {WorkDay} objWorkDay instance of WorkHour
 * @returns {Number} employee's salary
 */
exports.calculatePayWork = (objWorkDay) => {
    let tempObjWorkDay = Object.assign(new WorkDay(), objWorkDay);
    const hoursPaid = this.calculateWorkHours(tempObjWorkDay);
    let sum = 0;
    for (let i = 0; i < hoursPaid.length; i++) {
        const price = objWorkDay.getPrices()[i];
        sum += price * hoursPaid[i];
    }
    return sum;
}

/**
 * calculates hours worked by pay schedule
 * @param {WorkDay} objWorkDay instance of WorkHour
 * @returns {Array<Number>} array of hours worked by range
 */
exports.calculateWorkHours = (objWorkDay) => {
    let key = ["rangeHours1", "rangeHours2", "rangeHours3"];
    let hoursPaid = [];
    for (let index = 0; index < key.length; index++) {
        let hours = globals.schedule[key[index]];
        let minDate = utils.parseDay(objWorkDay.getDay(), hours[0]);
        let maxDate = utils.parseDay(objWorkDay.getDay(), hours[1]);
        maxDate = utils.validatedDate(minDate, maxDate);
        let minutestime = 0;
        let hourstime = 0;
        if (utils.isBetween(objWorkDay.getInitHour(), minDate, maxDate)) {
            if (objWorkDay.getEndHour().getTime() <= maxDate.getTime()) {
                const dateDiff = new Date(objWorkDay.getEndHour().getTime() - objWorkDay.getInitHour().getTime());
                hourstime = dateDiff.getUTCHours();
                minutestime = dateDiff.getUTCMinutes();

            } else {
                const dateDiff = new Date(maxDate.getTime() - objWorkDay.getInitHour().getTime());
                hourstime = dateDiff.getUTCHours();
                minutestime = dateDiff.getUTCMinutes();
                maxDate.setUTCMinutes(1);
                objWorkDay.setInitHour(maxDate);
            }
        }
        if (minutestime == 59) {
            hourstime++;
        }
        hoursPaid.push(hourstime);
    }
    return hoursPaid;
}

/**
 * Calculates an employee's salary by adding up the pay for each day's work.
 * @param {WorkDay} WorkDays instance of WorkHour
 * @returns {Array<Number>} array of hours worked by range
 */
function getSalaryEmployee(WorkDays) {
    let sum = 0;
    WorkDays.forEach((element) => {
        sum += element.getPay();
    })
    return sum;
}