//connection to database
const { Model, DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
require("dotenv").config();
const sequelize = new Sequelize('employee_tracker_db', 'postgres', 'password',
  {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
  }
);

sequelize.authenticate().then(() => {
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
        unique: true,
      },
    }
  )
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
        unique: true
      },
      salary: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
          //     model: 'departments',
          //     key: 'id',
          // },
        }
      }
    )
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
  // Employees.belongsTo(Roles); // {foreignKey: 'role_id'}
  Roles.belongsTo(Employees); // , {foreignKey: 'department_id'}  
  Employees.belongsTo(Employees); // , {foreignKey: 'manager_id'}
  
  Departments.sync({alter:true});
  Roles.sync({alter:true});
  Employees.sync({alter:true});
  console.log('Database connected successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// const sequelize = process.env.DB_URL
// ? new Sequelize (process.env.DB_URL)
// :  new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: process.env.DB_HOST || 'localhost',
//       dialect: process.env.DB_DIALECT || 'postgres'
//     }
//   );

module.exports = sequelize;