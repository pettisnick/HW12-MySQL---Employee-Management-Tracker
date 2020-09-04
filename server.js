const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");


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
  console.log("employee_trackerDB is connected");
  runApp();
});

//Start Function
function runApp() {
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
        "View Total Budget of a Department",
        "Exit"
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

        case "Exit":
          connection.end();
          break;
      }
    });
}

//View Departments
function viewDept() {
  console.log("viewing all the departments from database");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    //creates table of results in console view
    console.table(res);
    runApp();
  });
}


//View Roles
function viewRole() {
  console.log("viewing all roles from database");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    runApp();
  });
};


//View Employees
function viewEmployee() {
  console.log("viewing all employees from database");
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log(res);
    runApp();
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
      connection.query("INSERT INTO department (name) VALUES (?)", answer.addDepartment, function (err, res) {
        if (err) throw err;
        console.log("A new department has been added!");
        runApp();
      });
    });
}

//Add New Role
/*function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
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
      connection.query("INSERT INTO role SET ?", {
        title: answer.title,
        salary: answer.salary,
        department_id: answer.deptID,
      },
      console.log([answer.title, answer.salary, answer.deptID]);
      function (err) {
        runApp();
      });
    });
}
*/
function addRole() {
  const departments = [];
  connection.query("SELECT name FROM department", (err, result) => {
      if (err) throw err;
      result.forEach(dep => {
          departments.push(dep.name);
      });
      inquirer
          .prompt([
              {
                  name: "title",
                  type: "input",
                  message: "Enter the title of the new role?"
              },
              {
                  name: "salary",
                  type: "input",
                  message: "Enter the role salary?"
              },
              {
                  name: "deptID",
                  type: "list",
                  message: "What is the role department ID?",
                  choices: departments
              }
          ])
          .then(answer => {
              function departmentID(answer) {
              return(answer);
              }
              runApp();
          });
  });
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
    .then(function (res) {
      var query
      connection.query("INSERT INTO employee first_name, last_name, role_id, manager_id VALUES ?, ?, ?, ?", [res.firstName, res.lastName, res.roleID, res.managerID], function (err, res) {
        if (err) throw err;
        runSearch();
      });
    });
  }

  //Update Employee Roles
  function updEmployRol() {
    inquirer
    .prompt([
      {
        name: "title",
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
    .then(function (res) {
    //var query1 = "UPDATE role title, salary, department_id SET ?, ?, ?";
    connection.query("UPDATE role title, salary, department_id SET ?, ?, ?", [res.title, res.salary, res.deptID], function (err, res) {
      if (err) throw err;
      console.log(`${res}`);
      runSearch();
    });
  });
}

//Delete Department
function deleteDept() {
  inquirer
  .prompt([
    {
      name: "department",
      type: "rawlist",
      message: "Which department would you like to delete?",
      choices: names
    }
  ])
  .then(function (res) {
    var sql = "DELETE FROM department WHERE name = ?";
    connection.query(sql, [res.department], function (err, res) {
      if (err) throw err;
      console.log(`${res}`);
      runSearch();
    });
  });
}






