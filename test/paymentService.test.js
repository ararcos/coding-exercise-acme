const WorkDay = require("../src/models/workDay.js");
const utils = require("../src/utils/utils.js");
const PaymentService = require("../src/service/paymentService.js");
describe("Employee Object", () => {
    test("should respond with an employee object where the salary is 945", () => {
        const data = "ALEX=MO02:00-4:00,TH14:00-00:00,FR00:01-11:00,SA10:00-00:00,SU00:01-05:00";
        const validate = PaymentService.createEmployee(data);
        expect(validate.getSalary()).toEqual(945);
    })
    test("should respond with a work day object in which the payment is 30", () => {
        const data = "MO10:00-12:00";
        const validate = PaymentService.createWorkDay(data);
        const expected = new WorkDay("MO");
        expected.setInitHour(utils.parseDay("MO", "10:00"));
        expected.setEndHour(utils.parseDay("MO", "12:00"));
        expected.setPay(30);
        expected.setPrices([25, 15, 20]);
        expect(validate).toEqual(expected);
    })
    test("should respond with the pay number of that day 180", () => {
        const data = new WorkDay("TH");
        data.setInitHour(utils.parseDay("TH", "14:00"));
        data.setEndHour(utils.validatedDate(data.getInitHour(), utils.parseDay("TH", "00:00")));
        data.setPrices([25, 15, 20]);
        const validate = PaymentService.calculatePayWork(data);
        expect(validate).toEqual(180);

    })
    test("should respond with the array of number of hours worked per day", () => {
        const data = new WorkDay("TH");
        data.setInitHour(utils.parseDay("TH", "14:00"));
        data.setEndHour(utils.validatedDate(data.getInitHour(), utils.parseDay("TH", "00:00")));
        const validate = PaymentService.calculateWorkHours(data);
        const expected = [0, 4, 6];
        expect(validate).toEqual(expected);
    })
    test("provides an array of employee data", () => {

    })
})