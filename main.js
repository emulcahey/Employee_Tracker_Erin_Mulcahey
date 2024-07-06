const connection = require('./config/connection');
const index = require('./index');


connection.sync()
  .then(() => {
    console.log('Database synced');
  } )
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// console.log("about to run init")

  // Function call to initialize app
index.init();