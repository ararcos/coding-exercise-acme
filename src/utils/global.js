const regName = "[a-zA-Z]+";
const regDay = "(MO|TU|WE|TH|FR|SA|SU)";
const regHour = "(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])";
const regWorkTime = `${regDay}(${regHour}-${regHour})`;
const regEmployee = `${regName}=(${regWorkTime},)*(${regWorkTime})$`;

// Construction of regular expressions
const regExpDay = new RegExp(regDay, "g");
const regExpHour = new RegExp(regHour, "g");
const regExpEmployee = new RegExp(regEmployee, "gm");
const regExpWorkTime = new RegExp(regWorkTime, "g");

// Work schedule
const schedule = {
    "rangeHours1": ["00:01", "09:00"],
    "rangeHours2": ["09:01", "18:00"],
    "rangeHours3": ["18:01", "00:00"],
}

// Prices by schedule (weekends and weekdays)
const priceHoursWeekDay = [25, 15, 20];
const priceHoursWeekend = [30, 20, 25];

// Exports
module.exports.regExpDay = regExpDay;
module.exports.regExpHour = regExpHour;
module.exports.regExpEmployee = regExpEmployee;
module.exports.regExpWorkTime = regExpWorkTime;
module.exports.priceHoursWeekDay = priceHoursWeekDay;
module.exports.priceHoursWeekend = priceHoursWeekend;
module.exports.schedule = schedule;