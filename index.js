const inquirer = require("inquirer")
const questions = require("./modules/questions")
const db = require("./modules/db")
const mysql = require('mysql2');
cTable = require("console.table")
require("dotenv")

const viewAllDepartments = async ()=>{
    db.query("SELECT * FROM departments",(error,results)=>{
        if (error){
            console.log(error)
        }
        else console.table(results)
        mainMenu()
    });
}

const viewAllRoles = async ()=>{
    db.query("SELECT job_title,role_id,department_name,salary FROM roles LEFT JOIN departments ON roles.department_id=departments.department_id",(error,results)=>{
        if (error){
            console.log(error)
        }
        else console.table(results)
        mainMenu()
    });
}

const viewAllEmployees = async ()=>{
    db.query("SELECT a.employee_id AS ID, a.first_name AS First, a.last_name as Last, job_title As Title, department_name AS Department, CONCAT(b.first_name,' ', b.last_name) as Manager, CONCAT('$',FORMAT(salary,0)) AS Salary FROM employees a LEFT JOIN roles ON a.role_id=roles.role_id LEFT JOIN departments ON roles.department_id = departments.department_id LEFT JOIN employees b ON a.manager_id = b.employee_id" ,(error,results)=>{
        if (error){
            console.log(error)
        }
        else console.table(results)
        mainMenu()
    }); 
}

const addADepartment = async ()=>{
    const results = await inquirer.prompt(questions.addADepartment);
    const {departmentName} = results;
    db.query(`INSERT INTO departments(department_name) VALUES ("${departmentName}");`,err=>console.log(err))
    mainMenu()
}

// This is more complicated, because this will involve a dynamic list.
const addARole = async (isMiddle)=>{
    let departmentLib;
    await new Promise((resolve,reject)=>{db.query("SELECT * FROM departments",async (error,results)=>{
        console.log("in it")
        if (error){
            console.log(error)
        }
        else {
            departmentLib = results;
            const choices = results.map((dep)=>{
                return dep.department_name;
            })
            const answers = await inquirer.prompt(questions.addARole(choices)) 
            answers.departmentId = departmentLib.filter(dep=>{
                return dep.department_name == answers.departmentName;
            })[0].department_id;
            db.query(`INSERT INTO roles(job_title,department_id,salary) VALUES ("${answers.roleName}",${answers.departmentId}, ${answers.salary});`, async (error,results)=>{
                if (error){
                    console.log(error);
                }
                else if (!isMiddle){
                    mainMenu()
                }
                else (resolve(answers.roleName))
                
            }) 
        
        }
        })
    }).then((value)=>{
        roleName = value;
        console.log(roleName)
        return value})
}


const addAnEmployee = async ()=>{
    let roleLib;
    db.query("SELECT * FROM roles",async (error,results)=>{
        if (error){
            console.log(error)
        }
        else {
            roleLib = results;
            const choices = results.map((role)=>{
                return role.job_title;
            })
            const answers = await inquirer.prompt(questions.addAnEmployee(choices,[]).slice(0,-1));
            answers.roleId = roleLib.filter(role=>{
                return role.job_title == answers.roleName;
            })[0].role_id;
            answers.departmentId = roleLib.filter(role=>{
                return role.job_title === answers.roleName;
            })[0].department_id;
            console.log(answers.departmentId)
            console.log(answers.roleId);
            db.query(`SELECT * FROM employees JOIN roles ON employees.role_id=roles.role_id WHERE roles.department_id = ${answers.departmentId};`, async (error,results)=>{
                if (error){
                    console.log(error)
                }
                const coworkers = results.map(row=>{
                    return `${row.first_name} ${row.last_name} - ${row.job_title} (ID:${row.employee_id})`
                })
                const mAnswers = await inquirer.prompt([questions.addAnEmployee([],coworkers)[3]]);
                const managerUnparsed = mAnswers.manager;
                console.log(managerUnparsed)
                let managerId = managerUnparsed.slice(managerUnparsed.indexOf(":")+1,managerUnparsed.indexOf(")"))
                managerId = parseInt(managerId)|| null;
                
                db.query(`INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES ('${answers.firstName}','${answers.lastName}',${answers.roleId},${managerId})`,(error,results)=>{
                    if (error){
                        console.log(error)
                    }
                    else mainMenu();
                })
            })            
        }
    });
}

const updateEmployeeRole = async ()=>{
    const emp = {}
    db.query("SELECT * FROM employees RIGHT JOIN roles ON employees.role_id=roles.role_id",async (error,results)=>{
        // create role library, create employee library;      
        const employeeChoices = results.map(emp=>{
            return (`${emp.first_name} ${emp.last_name} - ${emp.job_title} (ID:${emp.employee_id})`)
        }).filter(emp=>!emp.includes("null null -"));
        const roleChoices = [...new Set(results.map(role=>{
            return (role.job_title)
        }))]
        const answers = await inquirer.prompt(questions.updateEmployeeRole(employeeChoices,roleChoices));
        let employeeID = answers.employee.substring(answers.employee.indexOf(':') + 1).slice(0,-1);
        const roleId = results.filter(result =>{return answers.role == result.job_title})[0].role_id;
        db.query(`UPDATE employees SET role_id=${roleId} WHERE employee_id = ${employeeID};`,(err,results)=>{
            console.log("role updated.")
        })
        mainMenu()
    })
}




const mainMenu = async ()=>{
    const answer = await inquirer.prompt(questions.menu);
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
            addARole(false);
            break;
        case "Add an Employee":
            addAnEmployee();
            break;
        case "Update an Employee Role":
            updateEmployeeRole();
            break;
    }
}



mainMenu()