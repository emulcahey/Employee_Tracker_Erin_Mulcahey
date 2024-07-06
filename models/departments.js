// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Department extends Model {}

// //department table with an id as the primary key and a name column that has a 30 character limit, is unique and not null
// Department.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING(30),
//       allowNull: false,
//       unique: true,
//     },
//   },
//   {
//     sequelize,
//     modelName: 'Department',
//   }
// );

// module.exports = Departments;