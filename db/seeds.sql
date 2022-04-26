INSERT INTO departments (department_name)
VALUES ("Accounting"),
("Sales"),
("Human Resources"),
("Executive");

INSERT INTO roles(job_title,department_id,salary)
VALUES ("Accounts Receivable",1,60000),
("Junior Sales Representative",2,55000),
("Human Resources Director",3,70000),
("Controller",1,120000),
("President",4,250000);


INSERT INTO employees(first_name,last_name,role_id)
VALUES ("Sally","Callahan",4),
("Jareth","Cutestorie",3),
("Hannah","Morgan",5);
