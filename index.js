var inquirer = require('inquirer');
var fs = require('fs');
const questions = require('./models/questions');
const sequelize = require('./config/connection');
const Departments = require('./models/departments');
const Employees = require('./models/employees');
const Roles = require('./models/roles');

// function will initialize app
// the function will prompt the user with the questions array
function init() {
    inquirer.prompt(questions).then((answers) => {
        //console.log(answers);
        callSequelize(answers);
    }).catch((error) => {
        console.error(error);
    });
}

async function callSequelize(answers) {
    // console.log('Sequelize called');
    switch (answers.mainOptions) {
        case 'View all Departments':
            const departments = await Departments.findAll({raw: true});
            console.table(departments);
            break;
        case 'View all Roles':
            const rolls = await Roles.findAll({raw: true});
            console.table(rolls);
            break;
        case 'View all Employees':
            const employees = await Employees.findAll({raw: true});
            console.table(employees);
            break;
        case 'View Employees by Manager':
            const employeesByManager = await Employees.findAll({raw: true});
            console.log('Viewed Employees by Manager');
            break;
        case 'View Employees by Department':
            console.log('Viewed Employees by Department');
            break;
        case 'View Total Utilized Budget of a Department':
            console.log('Viewed Total Utilized Budget of a Department');
            break;
        case 'Add a Department':
            const department = await Departments.create({name: answers.addADepartment});
            console.log('Added Department: ', department.name);
            break;
        case 'Add a Role':
            const existingDepartment = await Departments.findOne({where: {name: answers.addARoleDepartment}});
            const role = await Roles.create({title: answers.addARoleName, salary: answers.addARoleSalary, department_id: existingDepartment.id});
            console.log('Added Role: ', role.title,', Salary: ', role.salary,' Department: ', existingDepartment.name);
            break;
        case 'Add an Employee':
            const existingRole = await Roles.findOne({where: {title: answers.addAnEmployeeRole}});
            const existingManager = await Employees.findOne({where: {first_name: answers.addAnEmployeeManagerFirstName, last_name: answers.addAnEmployeeManagerLastName}});
            let employee;
            if (!existingManager) {
                employee = await Employees.create({first_name: answers.addAnEmployeeFirstName, last_name: answers.addAnEmployeeLastName, role_id: existingRole.id});
                console.log('Added Employee: ', employee.first_name,' ',employee.last_name,', Role: ', existingRole.title,', Manager: Null');
            } else {
                employee = await Employees.create({
                    first_name: answers.addAnEmployeeFirstName, 
                    last_name: answers.addAnEmployeeLastName, 
                    role_id: existingRole.id, 
                    manager_id: existingManager.id});
                    console.log('Added Employee: ', employee.first_name,' ',employee.last_name,', Role: ', existingRole.title,
                        ', Manager: ', existingManager.first_name,' ', existingManager.last_name);
            }
            break;
        case 'Update an Employee Role':
            console.log('Updated an Employee Role');
            break;
        case 'Update an Employee Manager':
            console.log('Updated an Employee Manager');
            break;
        case 'Department':
            console.log('Deleted Department');
            break;
        case 'Role':
            console.log('Deleted Role');
            break;
        case 'Employee':
            console.log('Deleted Employee');
            break;
    }
    // do stuff - load tables, add data, etc.
}

module.exports = {init};