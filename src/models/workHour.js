"use strict";
const utils = require("../utils/utils");

class WorkHour {

    constructor(day, initHour, endHour) {
        this._day = day;
        this._initHour = utils.parseDay(day, initHour);
        this._endHour = utils.parseDay(day, endHour);
        this._paid = 0;
    }
    getDay() {
        return this._day;
    }
    getInitHour() {
        return this._initHour;
    }
    getEndHour() {
        return this._endHour;
    }

    setPaid(paid) {
        this._paid = paid;
    }
    getPaid(ranges) {
        ranges.forEach(element => {
            console.log(utils.isBetween(element));
        });
    }
}

module.exports = WorkHour;