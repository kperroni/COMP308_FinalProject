// Load the module dependencies:
//  config.js module and mongoose module
var config = require('./config'),
    mongoose = require('mongoose');
// Define the Mongoose configuration method
module.exports = function () {
    // Use Mongoose to connect to MongoDB
    var db = mongoose.connect(config.db);

    require('../models/user.server.model');
    require('../models/ticket.server.model');
    require('../models/queue.server.model');
    require('../models/service.server.model');
    require('../models/guest.server.model');
    require('../models/student.server.model');
    require('../models/shift.server.model');
    require('../models/counter.server.model');
    require('../models/serviceProvider.server.model');
    // Return the Mongoose connection instance
    return db;
};