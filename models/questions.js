const inquirer = require('inquirer');

const questions = [{
//Prompt call - where all the questions get asked.
    name: 'mainOptions',
    message: 'What option would you like to select?',
    type: 'list',
    choices: ['View all Departments', 'View all Roles', 'View all Employees', 'View Employees by Manager', 
        'View Employees by Department', 'View Total Utilized Budget of a Department', 'Add a Department', 
        'Add a Role', 'Add an Employee', 'Update an Employee Role', 'Update an Employee Manager', 'Delete Departments, Roles, and Employees']    
    }, {
//add a department Question
    name: 'addADepartment',
    message: 'What is the name of the department you would like to add?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Add a Department to the first prompt
        return answers.mainOptions === "Add a Department";
    },
    }, {
//add a role Questions
    name: 'addARoleName',
    message: 'What is the name of the role you would like to add?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Add a Role to the first prompt
        return answers.mainOptions === "Add a Role";
    },
    }, {
    name: 'addARoleSalary',
    message: 'What is the salary of the role you would like to add?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Add a Role to the first prompt
        return answers.mainOptions === "Add a Role";
    },
    }, {
    name: 'addARoleDepartment',
    message: 'What is the department of the role you would like to add?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Add a Role to the first prompt
        return answers.mainOptions === "Add a Role";
    },
    }, {
//add an employee Questions
    name: 'addAnEmployeeFirstName',
    message: 'What is the first name of the employee you would like to add?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Add an Employee to the first prompt
        return answers.mainOptions === "Add an Employee";
    },
    }, {
    name: 'addAnEmployeeLastName',
    message: 'What is the last name of the employee you would like to add?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Add an Employee to the first prompt
        return answers.mainOptions === "Add an Employee";
    },
    }, {
    name: 'addAnEmployeeRole',
    message: 'What is the role of the employee you would like to add?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Add an Employee to the first prompt
        return answers.mainOptions === "Add an Employee";
    },
    }, {
    name: 'addAnEmployeeManagerFirstName',
    message: 'What is the first name of the manager for the employee that you would like to add?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Add an Employee to the first prompt
        return answers.mainOptions === "Add an Employee";
    },
    }, {
    name: 'addAnEmployeeManagerLastName',
    message: 'What is the last name of the manager for the employee that you would like to add?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Add an Employee to the first prompt
        return answers.mainOptions === "Add an Employee";
    },
    }, {
//view employee by manager Questions
    name: 'viewEmployeesByManagerFirstName',
    message: 'What is the first name of the manager you would like to view the employees for?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered View Employees by Manager to the first prompt
        return answers.mainOptions === "View Employees by Manager";
    },
    }, {
    name: 'viewEmployeesByManagerLastName',
    message: 'What is the last name of the manager you would like to view the employees for?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered View Employees by Manager to the first prompt
        return answers.mainOptions === "View Employees by Manager";
    },
    }, {
//view employees by department Question
    name: 'viewEmployeesByDepartment',
    message: 'What department would you like to view the employees for?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered View Employees by Department to the first prompt
        return answers.mainOptions === "View Employees by Department";
    },
    }, {
//View Total Utilized Budget of a Department Question
    name: 'viewTotalUtilizedBudgetOfADepartment',
    message: 'What department would you like to view the total utilized budget for?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered View Total Utilized Budget of a Department to the first prompt
        return answers.mainOptions === "View Total Utilized Budget of a Department";
    },
    }, {
//update an employee role Questions
    name: 'updateAnEmployeeRoleFirstName',
    message: 'What is the first name of the employee you would like to update the role for?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Update an Employee Role to the first prompt
        return answers.mainOptions === "Update an Employee Role";
    },
    }, {
    name: 'updateAnEmployeeRoleLastName',
    message: 'What is the last name of the employee you would like to update the role for?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Update an Employee Role to the first prompt
        return answers.mainOptions === "Update an Employee Role";
    },
    }, {
    name: 'updateAnEmployeeRoleNewRole',
    message: 'What is the new role for the employee?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Update an Employee Role to the first prompt
        return answers.mainOptions === "Update an Employee Role";
    },
    }, {
//update an employee manager Questions
    name: 'updateAnEmployeeManagerFirstName',
    message: 'What is the first name of the employee you would like to update the manager for?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Update an Employee Manager to the first prompt
        return answers.mainOptions === "Update an Employee Manager";
    },
    }, {
    name: 'updateAnEmployeeManagerLastName',
    message: 'What is the last name of the employee you would like to update the manager for?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Update an Employee Manager to the first prompt
        return answers.mainOptions === "Update an Employee Manager";
    },
    }, {
    name: 'updateAnEmployeeManagerNewManagerFirstName',
    message: 'Who is the new manager for the employee?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Update an Employee Manager to the first prompt
        return answers.mainOptions === "Update an Employee Manager";
    },
    }, {
    name: 'updateAnEmployeeManagerNewManagerLastName',
    message: 'What is the last name of the new manager for the employee?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Update an Employee Manager to the first prompt
        return answers.mainOptions === "Update an Employee Manager";
    },
    }, {
//delete departments, roles, and employees main Question
    name: 'deleteDepartmentRoleEmployee',
    message: 'Would you like to delete a department, role, or employee?',
    type: 'list',
    choices: ['Department', 'Role', 'Employee'],
    when: function( answers ) {
        // Only run if user answered Delete Departments, Roles, and Employees to the first prompt
        return answers.mainOptions === "Delete Departments, Roles, and Employees";
    },
    }, {
//delete department question
    name: 'deleteDepartment',
    message: 'Which department would you like to delete?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Department to the first prompt
        return answers.deleteDepartmentRoleEmployee === "Department";
    },
    }, {
//delete role question
    name: 'deleteRole',
    message: 'Which role would you like to delete?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Role to the first prompt
        return answers.deleteDepartmentRoleEmployee === "Role";
    },
    }, {
//delete employee questions
    name: 'deleteEmployeeFirstName',
    message: 'What is the first name of the employee you would like to delete?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Employee to the first prompt
        return answers.deleteDepartmentRoleEmployee === "Employee";
    },
    }, {
    name: 'deleteEmployeeLastName',
    message: 'What is the last name of the employee you would like to delete?',
    response: 'string',
    when: function( answers ) {
        // Only run if user answered Employee to the first prompt
        return answers.deleteDepartmentRoleEmployee === "Employee";
    },
    }
];

module.exports = questions;