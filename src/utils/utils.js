const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

exports.parseDay = (day, time) => {
    let date = new Date();
    let hour = time.split(":");
    date.setUTCHours(hour[0], hour[1], 0, 0);
    let numberDay = date.getUTCDay();
    let newNumberDay = days.indexOf(day) - numberDay;
    date.setDate(date.getUTCDate() + newNumberDay);
    return date;
}

exports.isBetween = (date, minDate, maxDate) => {
    return date.getTime() >= minDate.getTime() && date.getTime() <= maxDate.getTime();
}