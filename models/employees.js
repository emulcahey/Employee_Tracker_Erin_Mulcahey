const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Employees = sequelize.define('employees',
    {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
      first_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    manager_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    }
)

Employees.belongsTo(Employees); // , {foreignKey: 'manager_id'}

module.exports = Employees;