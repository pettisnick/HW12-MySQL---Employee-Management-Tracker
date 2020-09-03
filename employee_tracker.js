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

connection.connect(function (err) {
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
    .then(function (answer) {
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

//View Departments
function viewDept() {
  var query = "SELECT * FROM department";
  connection.query(query, { department: answer.department }, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " || Name: " + res[i].name);
    }
    runSearch();
  });
}

/*function addDept() {
  inquirer
    .prompt({
        name: "addDepartment",
        type: "input",
        message: "What is the name of the new department?",
      })
    .then(function (answer) {
      var query = "INSERT INTO department addDept();
      }
      else {
        connection.end();
      }
    });
*/

//View Roles
function viewRole() {
  var query = "SELECT * FROM role";
  connection.query(query, { role: answer.role }, function (err, res) {
    console.log('Roles:');
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " || Title: " + res[i].title + " || Salary: " + res[i].salary + " || Department ID: " + res[i].department_id);
    }
    runSearch();
  });
};


//View Employees
function viewEmployee() {
  var query = "SELECT * FROM employee";
  connection.query(query, { employee: answer.employee }, function (err, res) {
    console.log('Employees:');
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || Role ID: " + res[i].role_id + " || Manager ID: " + res[i].manager_id);
    }
    runSearch();
  });
};


