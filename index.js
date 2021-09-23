"use strict";

// Declaration of modules
const readline = require('readline');
const fs = require('fs');
const { getEmployeePayment, print } = require('./src/controller/employeeController');

// Creates the interface for reading data
var readInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// print a welcome message
console.log("ACME'S PAYMENT CALCULATOR\nMake sure you have the document (.txt) with your employees' data to continue.");

// reads the path to the file to work with (default: test/employees.txt)
readInterface.question("Enter the file path(default: test/employees.txt) => ", (path) => {
    let filename = path != "" ? path : "test/employees.txt";

    //read the file 
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
            console.log("\n\n Oops!\n An error has occurred\n", err.message);
            readInterface.close();
            throw err;
        }

        //Call the function to calculate the payment of the employees registered in the txt.
        const employees = getEmployeePayment(data);
        if (employees != null) {
            print(employees);
        }
        readInterface.close();
    });
});

// print the goodbye message and finish the process.
readInterface.on("close", function() {
    console.log("\n Thank you for using Acme's Payment Calculator ");
    process.exit(0);
});