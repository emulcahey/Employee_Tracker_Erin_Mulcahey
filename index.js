var inquirer = require('inquirer');
var fs = require('fs');
const questions = require('./models/questions');

// function will initialize app
// the function will prompt the user with the questions array
function init() {
    inquirer.prompt(questions).then((answers) => {
        console.log(answers);
        callSequelize(answers);
    }).catch((error) => {
        console.error(error);
    });
}

function callSequelize(answers) {
    console.log('Sequelize called');
    switch (answers.mainOptions) {
        case 'View all Departments':
            console.log('Viewed all Departments');
            //needs a function based on sequelize that selects data from the correct table
            break;
        case 'View all Roles':
            console.log('Viewed all Roles');
            break;
        case 'View all Employees':
            console.log('Viewed all Employees');
            break;
        case 'View Employees by Manager':
            console.log('Viewed Employees by Manager');
            break;
        case 'View Employees by Department':
            console.log('Viewed Employees by Department');
            break;
        case 'View Total Utilized Budget of a Department':
            console.log('Viewed Total Utilized Budget of a Department');
            break;
    }
    // do stuff - load tables, add data, etc.
}

module.exports = {init};