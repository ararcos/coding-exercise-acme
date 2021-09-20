"use strict";

class Employee {
    constructor() {
        this._workHours = [];
    }
    setName(name) {
        this._name = name;
    }
    getName() {
        return this._name;
    }
    setWorkHours(workHours) {
        this._workHours = workHours;
    }
    getWorkHours() {
        return this._workHours;
    }
    getPaid() {
        this._hoursWork.forEach(element => {
            let sum = 0;
            sum = sum + element.getPaidDay();
            console.log(sum);
        });
    }
}

module.exports = Employee;