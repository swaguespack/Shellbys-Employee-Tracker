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
    selectOption();
});

const selectOption = () => {
    
    inquirer.prompt({
        type:'list',
        name:'option',
        message:'Choose from the list of options.',
        choices:[
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "View Employees by Manager",
            "View Employees by Department",
            "View Budget by Department",
            "Add Deparment",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "Delete Role",
            "Delete Employee",
            "Delete Department",
            "End"
        ]
    })
    .then((option) => {
        switch(option){
            case "View All Departments":
            viewDepartmens();
            break;

            case "View All Roles":
            viewRoles();
            break;

            case "View All Employees":
            viewEmployees();
            break;

            case "View Employees by Manager":
            removeEmployees();
            break;

            case "View Employees by Department":
            viewDeptEmployee();
             break;

            case "View Budget by Department":
            viewDeptBudget();
            break;

            case "Add Deparment":
            addDept();
            break;

            case "Add Role":
            addRole();
             break;

            case "Add Employee":
            addEmployee();
            break;
    
            case "Update Employee Role":
            updateEmployeeRole();
            break;

            case "Update Employee Manager":
            updateEmployeeManager();
            break;

            case "Delete Role":
            deleteRole();
             break;

            case "Delete Employee":
            deleteEmployee();
            break;
    
            case "Delete Department":
            deleteDept();
            break;

            case "End":
            connection.end();
            break;
        }
    });
}
selectOption();