// The server.js file is the main file of your Node.js application 
// It will load the express.js file as a module to bootstrap your Express application
//
//The process.env.NODE_ENV variable is set to the default 'development‘
//value if it doesn 't exist.
// Set the 'NODE_ENV' variable
const path = require('path');
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the 'express' module
const configureExpress = require('./app/config/express');
const mongoose = require('./app/config/mongoose');
const configurePassport = require('./app/config/passport');

// Create a new Mongoose connection instance
const db = mongoose();

// Create a new Express application instance
const app = configureExpress();

// Configure the Passport middleware
const passport = configurePassport();

// Use the Express application instance to listen to the '3001' port
//app.listen(app.get('port'));
app.get('server').listen(app.get('port'));

// Log the server status to the console
console.log('Server running at http://localhost:'+app.get('port')+'/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;