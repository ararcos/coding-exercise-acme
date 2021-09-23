const EmployeeController = require("../src/controller/employeeController.js");

describe("Format data", () => {
    test("should respond with true when the data is in the correct format", () => {
        const data = "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
            "ASTRID=MO10:00-12:00,TU12:00-14:00,SU20:00-21:00\n" +
            "ALEXANDER=MO08:00-12:00,WE08:00-13:00,SA08:00-18:00\n" +
            "ELSA=MO07:00-10:00,TH09:01-18:00,SU10:00-19:00\n" +
            "MARICELA=FR06:00-20:00,SA13:00-21:00,SU07:00-23:00\n" +
            "LUIS=MO06:00-10:00,TU08:00-00:00,FR10:00-23:00";
        const validate = EmployeeController.isValidData(data)
        expect(validate).toBeTruthy();
    })
    test("should answer with false when the is not in correct day format", () => {
        const data = "RENE=MU10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
            "ASTRID=MU10:00-12:00,TU12:00-14:00,SU20:00-21:00\n" +
            "ALEXANDER=M08:00-12:00,WE08:00-13:00,SA08:00-18:00\n" +
            "ELSA=MU07:00-10:00,TH09:01-18:00,SU10:00-19:00\n" +
            "MARICELA=FR06:00-20:00,SA13:00-21:00,SU07:00-23:00\n" +
            "LUIS=MO06:00-10:00,TU08:00-00:00,FR10:00-23:00";
        const validate = EmployeeController.isValidData(data)
        expect(validate).toBeFalsy();
    })
    test("should answer with false when the is not in correct hour format", () => {
        const data = "RENE=MO10:00-25:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
            "ASTRID=MO10:00-12:00,TU12:00-14:00,SU20:00-21:00\n" +
            "ALEXANDER=MO08:00-12:00,WE08:00-13:00,SA08:00-18:00\n" +
            "ELSA=MO07:00-10:00,TH09:01-18:00,SU10:00-19:00\n" +
            "MARICELA=FR06:00-20:00,SA13:00-21:00,SU07:00-30:00\n" +
            "LUIS=MO06:00-10:00,TU08:00-00:00,FR10:00-23:00";
        const validate = EmployeeController.isValidData(data)
        expect(validate).toBeFalsy();
    })
    test("should respond with false when not in correct working day format", () => {
        const data = "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
            "ASTRID=MO10:00-12:00,TU12:00-14:00,SU20:00-21:00\n" +
            "ALEXANDER=MO08:00-12:00,WE08:00-13:00,SA08:00-18:00\n" +
            "ELSA=MO07:00-10:00,TH09:01-18:00,SU10:00-19:00\n" +
            "MARICELA=FR06:00-20:00,SA13:00-21:00,SU07:00-23:00\n" +
            "LUIS=MO06:00-10:00,TU08:00-00:00,FR10:00-23:00";
        const validate = EmployeeController.isValidData(data)
        expect(validate).toBeTruthy();
    })
    test("provides an array of employee data", () => {
        const data = "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00\n" +
            "ASTRID=MO10:00-12:00,TU12:00-14:00,SU20:00-21:00\n" +
            "ALEXANDER=MO08:00-12:00,WE08:00-13:00,SA08:00-18:00\n" +
            "ELSA=MO07:00-10:00,TH09:01-18:00,SU10:00-19:00\n" +
            "MARICELA=FR06:00-20:00,SA13:00-21:00,SU07:00-23:00\n" +
            "MARCELA=FR06:00-20:00,SA13:00-21:00,SU07:00-23:00\n" +
            "LUIS=MO06:00-10:00,TU08:00-00:00,FR10:00-23:00";
        const dataSplit = EmployeeController.splitDataEmployees(data)
        expect(dataSplit.length).toEqual(7);
    })
})

describe("Payment Logic", () => {
    test("should return an array of employee object and the salary that first is 85", () => {
        const data = "ASTRID=MO10:00-12:00,TU12:00-14:00,SU20:00-21:00";
        const employeesTest = EmployeeController.getEmployeePayment(data);
        expect(employeesTest[0].getSalary()).toEqual(85);
    })
    test("should return an array of employee object and the salary that first is 215", () => {
        const data = "RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00";
        const employeesTest = EmployeeController.getEmployeePayment(data);
        expect(employeesTest[0].getSalary()).toEqual(215);
    })
})