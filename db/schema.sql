DROP DATABASE IF EXISTS employee_mgmt_db;
CREATE DATABASE employee_mgmt_db;
USE employee_mgmt_db;

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(50) NOT NULL
);

CREATE TABLE roles (
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(50) NOT NULL,
    department_id INT NOT NULL,
    salary INT,
    FOREIGN KEY (department_id)
    REFERENCES departments(department_id)
);
