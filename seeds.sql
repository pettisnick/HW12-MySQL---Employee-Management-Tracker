-- Seeds for SQL table. We haven't discussed this type of file yet
USE employee_trackerDB;

-- Table 1
-- Department data
INSERT INTO department (name) 
values ('Accounting');
INSERT INTO department (name) 
values ('Sales');
INSERT INTO department (name) 
values ('HR');
INSERT INTO department (name) 
values ('Markteting');

-- Table 2
-- Role data
INSERT INTO role (title, salary, department_id) 
values ('Market_Research', 65000, 4);
INSERT INTO role (title, salary, department_id)
values ('Accountant', 75000, 1);
INSERT INTO role (title, salary, department_id) 
values ('Sales_Manager', 85000, 2);
INSERT INTO role (title, salary, department_id)
values ('HR-Specialist', 60000, 3);

-- Table 3
-- Employee data
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
values ('Dave', 'Smith', 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
values ('John', 'Bright', 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
values ('Judy', 'Lowe', 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
values ('Ben', 'Porter', 4, 4);