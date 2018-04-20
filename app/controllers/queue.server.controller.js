// Load the 'Queue' Mongoose model
var QueueModel = require('mongoose').model('Queue');

exports.createQueue = function (req, res, next) {

    // Create a new instance of the 'Queue' Mongoose model
    var queue = new QueueModel(req.body);
    console.log("body: " + req.body);
    // Use the 'Queue' instance's 'save' method to save a new queue document
    queue.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(queue);

        }
    });
};

// Create a new 'getQueues' controller method
exports.getQueues = function (req, res, next) {
    console.log("controller", "getQueues");
    // Use the 'QueueModel' instance's 'find' method to retrieve a new queue document
    QueueModel.find({}, function (err, queues) {
        if (err) {
            return next(err);
        } else {
            res.json(queues);
        }
    });
};