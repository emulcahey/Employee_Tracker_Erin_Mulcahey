const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Departments = sequelize.define('departments', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
  },
  { indexes: [{ unique: true, fields: ["name"]}] }
)

module.exports = Departments;