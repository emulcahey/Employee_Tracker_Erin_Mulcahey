//employee table with an id as the primary key, a first_name column that has a 30 character limit, is not null, and a last_name column that has a 30 character limit, is not null. role_id column that references the role_id from the role table, and a manager_id column that references the employee_id from the employee table
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Employees extends Model {}

// Employees.init(
//     {
//         id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         },
//         first_name: {
//         type: DataTypes.STRING(30),
//         allowNull: false,
//         },
//         last_name: {
//         type: DataTypes.STRING(30),
//         allowNull: false,
//         },
//         role_id: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: 'role',
//             key: 'id',
//         },
//         },
//         manager_id: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: 'employee',
//             key: 'id',
//         },
//         },
//     },
//     {
//         sequelize,
//         modelName: 'employees',
//     }
//     );

// module.exports = Employees;