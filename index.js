const inquirer = require("inquirer")
const questions = require("./modules/questions")
const db = require("./modules/db")
const mysql = require('mysql2');

const viewAllDepartments = async ()=>{
    db.query("SELECT * FROM departments",(error,results)=>{
        if (error){
            console.log(error)
        }
        else console.log(results)
    });
}




const mainMenu = async ()=>{
    const answer = await inquirer.prompt(questions.menu);
    console.log(answer)
    switch (answer.action){
        case "View All Departments":
            viewAllDepartments();
            break;
        case "View All Roles":
            viewAllRoles();
            break;
        case "View All Employees":
            viewAllEmployees();
            break;
        case "Add a Department":
            addADepartment();
            break;
        case "Add a Role":
            addARole();
            break;
        case "Add an Employee":
            addAnEmployee();
            break;
        case "Update an Employee Role":
            addAnEmployeeRole();
            break;
    }
}



mainMenu()