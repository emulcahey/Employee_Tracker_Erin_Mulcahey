const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Employees = require('./employees');

const Roles = sequelize.define('roles',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      salary: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        }
      },
      { indexes: [{ unique: true, fields: ["title"]}]}
    )

    Roles.belongsTo(Employees); // , {foreignKey: 'department_id'}  

module.exports = Roles;