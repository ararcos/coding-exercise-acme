"use strict";

const readline = require('readline');
const fs = require('fs');
const { getEmployeePayment } = require('./src/controller/employeeController')

var readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("ACME'S PAYMENT CALCULATOR\nMake sure you have the document (.txt) with your employees' data to continue.")
readInterface.question("Enter the file path(default: test/employees.txt) => ", (path) => {
    let filename = path != "" ? path : "test/employees.txt";
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
            console.log("\n\n Oops!\n An error has occurred\n", err.message);
            readInterface.close();
            throw err;
        }
        let employeePayment = getEmployeePayment(data)
            // console.log(employeePayment);
        readInterface.close();
    });
});

readInterface.on("close", function() {
    console.log("\n Thank you for using Acme's Payment Calculator ");
    process.exit(0);
});