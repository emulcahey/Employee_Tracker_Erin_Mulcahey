//create a table in the database that has id as the primary key, title as a string, salary as a decimal, and department_id 
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Roles extends Model {}

// Roles.init(
//     {
//         id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         },
//         title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         },
//         salary: {
//         type: DataTypes.DECIMAL,
//         allowNull: false,
//         },
//         department_id: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: 'departments',
//             key: 'id',
//         },
//         },
//     },
//     {
//         sequelize,
//         modelName: 'roles',
//     }
//     );

// module.exports = Roles;