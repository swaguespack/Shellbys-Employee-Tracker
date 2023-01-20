//Dependencies for this application
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//Connect to database
const db =mysql2.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME
},
console.log("Connected to the company database.")
);