const Sequelize = require("sequelize");
require("dotenv").config();
const connection = require('./config/connection');

connection.sync()
  .then(() => {
    console.log('Database synced');
  } )
  .catch((err) => {
    console.error('Error syncing database:', err);
  });