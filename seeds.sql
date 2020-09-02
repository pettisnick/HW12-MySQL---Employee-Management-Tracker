USE employee_trackerDB;

-- Department data
INSERT INTO department (id, name) 
values (1, 'Accounting');
INSERT INTO department (id, name) 
values (2, 'Sales');
INSERT INTO department (id, name) 
values (3, 'HR');
INSERT INTO department (id, name) 
values (4, 'Markteting');

-- Role data
INSERT INTO role (id, title, salary, department_id) 
values (1, 'Market_Research', 65000, 4);
INSERT INTO role (title, salary, department_id)
values (2, 'Accountant', 75000, 1);
INSERT INTO role (title, salary, department_id) 
values (3,'Sales_Manager', 85000, 2);
INSERT INTO role (title, salary, department_id)
values (4, 'HR-Specialist', 60000, 3);

-- Employee data
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
values (1, 'Dave', 'Smith', 1, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
values (2, 'John', 'Bright', 2, 2);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
values (3,'Judy', 'Lowe', 3, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) 
values (4, 'Ben', 'Porter', 4, 4);