const mysql = require("mysql");
const inquirer = require("inquirer");
//const cTable = require("console.table");
//const { allowedNodeEnvironmentFlags } = require("process");

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
  //Sending new query to mysql
  connection.query(query, { department: answer.department }, function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].id + " || Name: " + res[i].name);
    }
    runSearch();
  });
}


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

//Add New Department
function addDept() {
  inquirer
    .prompt({
        name: "addDepartment",
        type: "input",
        message: "What is the name of the new department?",
      })
    .then(function (answer) {
      connection.query = "INSERT INTO department (name) VALUES (?)", [res.addDepartment], function(err, res) {
        if (err) throw err;
        console.log(`${res.addDepartment} has been inserted into as a new department. \n`);
        runSearch();
      };
    });
  }

  //Add New Role
  function addRole() {
    inquirer
    .prompt([
    {
      name: "newTitle",
      type: "input",
      message: "Enter the new title."
    },
    {
      name: "salary",
      type: "number",
      message: "What is the salary?"
    },
    {
      name: "deptID",
      type: "number",
      message: "What is the department ID?"
    }
  ])
  .then(function (answer) {
    connection.query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [res.newTitle, res.salary, res.deptID], function (err, res) {
      if (err) throw err;
      console.log(`${res}`)
      
    }
    
  })
  }

  //Add New Employee
  function addEmployee() {
    inquirer
    .prompt([
    {
      name: "firstName",
      type: "input",
      message: "Enter your first name."
    },
    {
      name: "lastName",
      type: "input",
      message: "Enter your last name."
    },
    {
      name: "roleID",
      type: "number",
      message: "What is the role ID?"
    },
    {
      name: "managerID",
      type: "number",
      message: "What is the manager ID?"
    }
  ])
  .then(function (answer) {
    connection.query = "INSERT INTO employee (first name, last name, role ID, manager ID) VALUES (?, ?, ?)", [res.firstName, res.lastName, res.roleID, res.managerID], function (err, res) {
      if (err) throw err;
      console.log(`${res}`)
      
    }
    
  })
  }

    
    
    


