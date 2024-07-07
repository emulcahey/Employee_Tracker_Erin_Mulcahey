var inquirer = require('inquirer');
var fs = require('fs');
const questions = require('./models/questions');
const sequelize = require('./config/connection');
const Departments = require('./models/departments');
const Employees = require('./models/employees');
const Roles = require('./models/roles');
const { where } = require('sequelize');

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
    // console.log('Sequelize called, for options: ', answers.mainOptions);
    switch (answers.mainOptions) {
        case 'View all Departments':
            const departments = await Departments.findAll({raw: true});
            console.table(departments);
            break;
        case 'View all Roles':
            const rolls = await Roles.findAll({raw: true});
            const departmentNames = await Departments.findAll({where: {id: rolls.map(role => role.department_id)}});
            rolls.forEach(role => {
                const department = departmentNames.find(d => d.id === role.department_id);
                role.department = department.name;
            });
            console.table(rolls);
            break;
        case 'View all Employees':
            const employees = await Employees.findAll({raw: true});
            const employeeRoles = await Roles.findAll({where: {id: employees.map(employee => employee.role_id)}}, {raw: true});
            const employeeDepartments = await Departments.findAll({where: {id: employeeRoles.map(role => role.department_id)}});
            const employeeManagers = await Employees.findAll({where: {id: employees.map(employee => employee.manager_id)}});
            employees.forEach(employee => {
                const role = employeeRoles.find(r => r.id === employee.role_id);
                const department = employeeDepartments.find(d => d.id === role.department_id);
                const manager = employeeManagers.find(m => m.id === employee.manager_id);
                employee.role = role.title;
                employee.department = department.name;
                employee.salary = role.salary;
                employee.manager = manager ? manager.first_name + ' ' + manager.last_name : null;
            });
            console.table(employees);
            break;
        case 'View Employees by Manager':
            const employeesByManager = await Employees.findOne({where: {first_name: answers.viewEmployeesByManagerFirstName, last_name: answers.viewEmployeesByManagerLastName}});
            const employeesByManagerList = await Employees.findAll({where: {manager_id: employeesByManager.id}, raw: true});
            console.table(employeesByManagerList);
            break;
        case 'View Employees by Department':
            const employeesByDepartment = await Departments.findOne({where: {name: answers.viewEmployeesByDepartment}});
            const rolesByDepartmentList = await Roles.findAll({where: {department_id: employeesByDepartment.id}, raw: true});
            const employeesByDepartmentList = await Employees.findAll({where: {role_id: rolesByDepartmentList.map(role => role.id)}, raw: true});
            console.table(employeesByDepartmentList);
            break;
        case 'View Total Utilized Budget of a Department':
            const targetDepartment = await Departments.findOne({where: {name: answers.viewTotalUtilizedBudgetOfADepartment}});
            const rolesByDepartment = await Roles.findAll({where: {department_id: targetDepartment.id}, raw: true});
            const targetEmployees = await Employees.findAll({where: {role_id: rolesByDepartment.map(role => role.id)}});
            const totalSalariesByRole = {};
            targetEmployees.forEach(employee => {
                const role = employee.role_id;
                const salary = rolesByDepartment.find(r => r.id === role)?.salary || 0;
                totalSalariesByRole[role] = (totalSalariesByRole[role] || 0) + parseFloat(salary);
            });
            const totalUtilizedBudget = Object.values(totalSalariesByRole).reduce((acc, salary) => acc + parseFloat(salary), 0);
            console.log('Total Utilized Budget of The ', targetDepartment.name, ' Department:', totalUtilizedBudget);
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
            const employeeToUpdate = await Employees.findOne({where: {first_name: answers.updateAnEmployeeRoleFirstName, last_name: answers.updateAnEmployeeRoleLastName}});
            const newRole = await Roles.findOne({where: {title: answers.updateAnEmployeeRoleNewRole}});
            await Employees.update({role_id: newRole.id}, {where: {id: employeeToUpdate.id}});
            console.log('Updated Employee: ', employeeToUpdate.first_name,' ',employeeToUpdate.last_name,' Role to ', newRole.title);
            break;
        case 'Update an Employee Manager':
            const employeeToUpdateManager = await Employees.findOne({where: {first_name: answers.updateAnEmployeeManagerFirstName, last_name: answers.updateAnEmployeeManagerLastName}});
            const newManager = await Employees.findOne({where: {first_name: answers.updateAnEmployeeManagerNewManagerFirstName, last_name: answers.updateAnEmployeeManagerNewManagerLastName}});
            await Employees.update({manager_id: newManager.id}, {where: {id: employeeToUpdateManager.id}});
            console.log('Updated Employee: ', employeeToUpdateManager.first_name,' ',employeeToUpdateManager.last_name,' Manager to ', newManager.first_name,' ',newManager.last_name);
            break;
        case 'Delete Departments, Roles, and Employees':
        {
            switch (answers.deleteDepartmentRoleEmployee) {
                case 'Department':
                    const departmentToDelete = await Departments.findOne({where: {name: answers.deleteDepartment}});
                    await Departments.destroy({where: {id: departmentToDelete.id}});
                    console.log('Deleted Department: ', departmentToDelete.name);
                    break;
                case 'Role':
                    const roleToDelete = await Roles.findOne({where: {title: answers.deleteRole}});
                    await Roles.destroy({where: {id: roleToDelete.id}});
                    console.log('Deleted Role: ', roleToDelete.title);
                    break;
                case 'Employee':
                    console.log('about to delete employee')
                    const employeeToDelete = await Employees.findOne({where: {first_name: answers.deleteEmployeeFirstName, last_name: answers.deleteEmployeeLastName}});
                    const employeeToDeleteID = employeeToDelete.id;
                    await Employees.destroy({where: {id: employeeToDeleteID}});
                    console.log('Deleted Employee: ', employeeToDelete.first_name,' ',employeeToDelete.last_name);
                    break;
            }
            break
        }
    }
}

module.exports = {init};