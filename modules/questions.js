const menu = [
        {
            type: 'list',
            message: 'Choose an action.',
            name:"action",
            choices: ["View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role"]
        }
    ]

const addADepartment = [
    {
        type:'input',
        message:'Enter new department name.',
        name:'departmentName'
    }
]

const addARole = (deps) =>{
    return [
        {
            type:'list',
            message:"Add role to which department?",
            choices:deps,
            name:'departmentName'
        },
        {
            type:'input',
            message:"What is the name of the role",
            name:"roleName"
        },
        {
            type:'input',
            message:"What is the annual salary?",
            name:"salary"
        }
    ]
}

const addAnEmployee = (roles,coworkers)=>{
    return [
        {type:'input',
        message:'Enter employee first name.',
        name:"firstName"
        },
        {
            type:"input",
            message:"Enter employee last name",
            name:"lastName"
        },
        {
            type:"list",
            message:"Choose employee role",
            name:"roleName",
            choices:[...roles,"Add a New Role"]
        },
        {
            type:'list',
            message:"Who is their manager?",
            name:"manager",
            choices:["None",...coworkers]
        }
    ]
}

const updateEmployeeRole = (employees,roles)=>{
    return [
        {
            type:"list",
            message:"Which employee is getting a new role?",
            name:"employee",
            choices:employees
        },
        {
            type:"list",
            message:"What is their new role?",
            name:"role",
            choices:roles
        }
    ]
}


module.exports = {menu,addADepartment,addARole,addAnEmployee,updateEmployeeRole};