const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { allowedNodeEnvironmentFlags } = require("process");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Braves20!",
  database: "employee_trackerDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
  .prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do?",
    choices: [
      "View Departments", 
      "View Roles", 
      "View Employees",
      "Add Departments",
      "Add Roles",
      "Add Employees",
      "Update Employee Roles",
      "Update Employee Managers",
      "View Employees by Manager",
      "Delete Departments",
      "Delete Roles",
      "Delete Employees",
      "View Total Budget of a Department"
    ]
  })
  .then(function(answer) {
    switch (answer.action) {
      case "View Departments":
        viewDept();
        break;

      case "View Roles":
        viewRole();
        break;

      case "View Employees":
        viewEmployee();
        break;

      case "Add Departments":
        addDept();
        break;
      
      case "Add Roles":
        addRole();
        break;
      
      case "Add Employees":
        addEmployee();
        break;

      case "Update Employee Roles":
        updEmployRol();
        break;

      case "Update Employee Managers":
        updEmployMngr();
        break;

      case "View Employees by Manager":
        viewEmployByMngr();
        break;

      case "Delete Departments":
        deleteDept();
        break;

      case "Delete Roles":
        deleteRole();
        break;
        
      case "Delete Employees":
        deleteEmploy();
        break;
        
      case "View Total Budget of a Department":
        budget();
        break;
    }
  });
}

function viewDept() {
  inquirer
  .prompt({
    name: "department",
    type: "input",
    message: "What department would you like to view?"
  })
  .then(function(answer) {

  })
}