//Dependencies for this application
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//Connect to database
const db = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'aSecret',
    database: 'company_db'
},
console.log("Connected to the company database.")
);

db.connect(function(err){
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
            viewDepartments();
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

//View All Departments
function viewDepartments() {

    var query =
    `SELECT d.id, d.name
    FROM department d`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
  
      selectOption();
    });
  }

// View All Roles
function viewRoles() { 

    var query =
    `SELECT r.id, r.title, r.salary, d.name AS department
    FROM role r
    LEFT JOIN department d
    ON d.id = r.department_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
  
      selectOption();
  
    });
  }
//View All Employees
function viewEmployees() {

    var query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    LEFT JOIN role r
    ON e.role_id = r.id
    LEFT JOIN department d
    ON d.id = r.department_id
    LEFT JOIN employees m
    ON m.id = e.manager_id`
  
    connection.query(query, function (err, res) {
      if (err) throw err;
  
      console.table(res);
  
      selectOption();
    });
  
  }