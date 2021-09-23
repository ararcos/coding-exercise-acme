"use strict";

const globals = require("../utils/global.js");


const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

exports.parseDay = (day, time) => {
    let date = new Date();
    let hour = time.split(":");
    let numberDay = date.getUTCDay();
    let newNumberDay = days.indexOf(day) - numberDay;
    date.setDate(date.getUTCDate() + newNumberDay);
    date.setUTCHours(hour[0], hour[1], 0, 0);
    return date;
}

exports.isBetween = (date, minDate, maxDate) => {
    return date.getTime() >= minDate.getTime() && date.getTime() <= maxDate.getTime();
}

exports.getPriceDay = (day) => {
    const index = days.indexOf(day);
    return index == 0 || index == days.length - 1 ? globals.priceHoursWeekend : globals.priceHoursWeekDay;
}

exports.validatedDate = (initDate, endDate) => {
    if (initDate.getTime() > endDate.getTime()) {
        endDate.setUTCDate(endDate.getUTCDate() + 1);
    }
    return endDate;
}