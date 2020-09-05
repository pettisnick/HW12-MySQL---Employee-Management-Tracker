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
        console.log(res);
        runApp();
      });
    });
}

//Add New Role
function addRole() {
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
        type: "input",
        message: "What is the role department ID?"
      }
    ])
    .then(function (answer) {
      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.title, answer.salary, answer.deptID], function (err, res) {
        if (err) throw err;
        console.log(res);
        runApp();
      });
    });
}

//Add New Employees
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter the employee's first name?"
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter the employee's last name?"
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the employee's role ID?"
      },
      {
        name: "managerID",
        type: "input",
        message: "Who is the employee's manager?"
      }
    ])
    .then(function (answer) {
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleID, answer.managerID], function (err, res) {
        if (err) throw err;
        console.log(res);
        runApp();
      })
    });
}


//Update Employee Roles
function updEmployRol() {
  connection.query("SELECT concat(first_name,' ',last_name) as entireName FROM employee", function (err, res) {
    if (err) throw err;
    let employ = [];
    res.forEach(element.entireName)
  });
  inquirer
    .prompt({
      name: "updateEmployee",
      type: "list",
      message: "Which employee would you like to update?",
      choices: employ
    })
    .then(function (answer) {
      let value = answer.employee.split(" ");
      inquirer
        .prompt({
          name: "employee",
          type: "list",
          message: "Which value would you like to change?",
          choices: ["First Name", "Last Name", "Role ID", "Manager ID"]
        })
        .then(function (answer) {
          inquirer
            .prompt({
              name: "employee",
              type: "input",
              message: `Enter new ${answer.employee}:`
            })
            .then(function (userInput) {
              let option = "";
              switch (answer.employee) {
                case "First Name":
                  option = "firstName"
                  break;
                case "Last Name":
                  option = "lastName"
                  break;
                case "Role ID":
                  option = "roleId"
                  break;
                case "Manager ID":
                  option = "mngrId"
                  break;
              }
              connection.query(`UPDATE employee SET ${option} = "${userInput.employee}" WHERE id = ${id[0]}`, function (err) {
                if (err) throw err;
                runApp();
              })
            })
        })
    })

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






