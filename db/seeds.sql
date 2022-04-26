INSERT INTO departments (department_name)
VALUES ("Accounting"),
("Sales"),
("Human Resources");

INSERT INTO roles(job_title,department_id,salary)
VALUES ("Accounts Receivable",1,60000),
("Junior Sales Representative",2,55000),
("Human Resources Director",3,70000),
("Controller",1,120000);


INSERT INTO employees(first_name,last_name,role_id)
VALUES ("Sally","Callahan",4);

INSERT INTO employees(first_name,last_name,role_id,manager_id)
VALUES ("Jareth","Cutestorie",1,1);