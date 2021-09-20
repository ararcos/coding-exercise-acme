const regName = "[a-zA-Z]+";

const regDay = "(MO|TU|WE|TH|FR|SA|SU)";

const regHour = "(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])";

const regWorkTime = `${regDay}(${regHour}-${regHour})`;


const regEx = `${regName}=(${regWorkTime},)*(${regWorkTime})$`;

const ranges = {
    "rangeHours1": ["00:01", "09:00"],
    "rangeHours2": ["09:01", "18:00"],
    "rangeHours3": ["18:01", "00:00"],
}

module.exports.regEx = regEx;
module.exports.regDay = regDay;
module.exports.regHour = regHour;
module.exports.regWorkTime = regWorkTime;
module.exports.regName = regName;

module.exports.rangesHours = ranges;