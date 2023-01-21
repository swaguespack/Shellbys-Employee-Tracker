//Dependencies for this application
const mysql2 = require('mysql2');
const inquirer = require('inquirer');
require("console.table");

//mysql connection
const db = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'Monty-4169',
    database: 'company_db'
},
//console.log("Connected to the company database.")
);

db.connect(function(err){
    if (err) throw err;
    console.log(" EMPLOYEE MANAGER")
    //Start app
    selectOption();
});

//Function that prompts user to choose an action from the list of options
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
            "Exit"
        ]
    })
    //Allows user to arrow through options to select from
    .then((option) => {
        switch(option.option){
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
            viewEmployeeByManager();
            break;

            case "View Employees by Department":
            viewEmployeesByDept();
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

            case "Exit":
            db.end();
            break;
        }
    });
}

//View All Departments
 viewDepartments = () => {

    let query =
    `SELECT d.id, d.name
    FROM department d`
  
    db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
  
      selectOption();
    });
  }

// View All Roles
 viewRoles = () => { 

    let query =
    `SELECT r.id, r.title, r.salary, d.name AS department
    FROM roles r
    LEFT JOIN department d
        ON d.id = r.department_id`
  
    db.query(query, (err, res) => {
      if (err) throw err;
      console.table(res);
  
      selectOption();
  
    });
  }
//View All Employees
viewEmployees = () => {

    let query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e
    LEFT JOIN roles r
        ON e.role_id = r.id
    LEFT JOIN department d
        ON d.id = r.department_id
    LEFT JOIN employees m
        ON m.id = e.manager_id`
  
    db.query(query,(err, res) => {
      if (err) throw err;
      console.table(res);
  
      selectOption();
    });
  }

  //Add Department
addDept = () => {
    
    inquirer.prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of your new department?'
            },
        ])
        .then((answer) => {
            console.log(answer);
            db.query(`INSERT INTO department SET ?`,
            {
                name: answer.deptName
            }, 
            (err, res) => {
                if (err) throw err;
                console.table(res)

                console.log(`${answer.deptName} added successfully to Departments.\n`)
                selectOption();
        });
    });
}

//Add Role
addRole = () => { 
  
    db.query(`SELECT * FROM department;`, (err, res) => {
      if (err) throw err;
      
      const departmentChoices = res.map(({id,name}) => ({
        value: id, name: `${id} ${name}`
      }));
      promptAddRole(departmentChoices)
    });
  }

  promptAddRole = (departmentChoices) =>{
    inquirer.prompt([
        {
            type: 'input',
            name:'roleTitle',
            message: 'Enter Role Title'
        },
        {
            type: 'input',
            name:'roleSalary',
            message: 'Enter Role Salary' 
        },
        {
            type: 'list',
            name:'departmentID',
            message: 'Select Role Department',
            choices: departmentChoices
        },
    ])
    .then((answer) => {
        let query = `INSERT INTO roles SET ?`

        db.query(query,{
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.departmentID
        },
        (err, res) => {
            if (err) throw err;
            console.table(res)

            console.log(`${answer.roleTitle} added successfully to Roles.\n`)
            selectOption();
         });

    });
  }

//Add Employee
addEmployee = () => { 
  
    db.query(`SELECT * FROM employees;`, (err, res) => {
      if (err) throw err;
      
      const roleChoices = res.map(({id,role_id}) => ({
        value: id, name: `${role_id}`
      }));

      const managerChoices = res.map(({id,manager_id}) => ({
        vale: id, name: `${manager_id}`
      }));

      console.table(res);
      promptAddEmployee(roleChoices,managerChoices)
    });
  }

  promptAddEmployee = (roleChoices,managerChoices) =>{
    inquirer.prompt([
        {
            type: 'input',
            name:'firstName',
            message: 'Enter Employee First Name'
        },
        {
            type: 'input',
            name:'lastName',
            message: 'Enter Employee Last Name' 
        },
        {
            type: 'list',
            name:'roleID',
            message: 'Select Employee Role',
            choices: roleChoices
        },
        {
            type: 'list',
            name:'managerID',
            message: 'Select Employee Manager',
            choices: managerChoices
        },
    ])
    .then((answer) => {
        let query = `INSERT INTO employees SET ?`

        db.query(query,{
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleID,
            manager_id: answer.managerID
        },
        (err, res) => {
            if (err) throw err;
            console.table(res)

            console.log(`${answer.firstName} added successfully to Employees.\n`)
            selectOption();
         });

    });
  }
    

