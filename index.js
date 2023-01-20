//Dependencies for this application
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//Connect to database
const db = mysql2.createConnection({
    host: "localhost",
    user: 'root',
    password: '',
    database: 'company_db'
},
console.log("Connected to the company database.")
);

connection.connect(function(err){
    if (err) throw err;
    console.log(" EMPLOYEE MANAGER")
    firstPrompt();
});

function firstPrompt(){
    
}