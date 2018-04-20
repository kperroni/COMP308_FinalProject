// Load the 'Guest' Mongoose model
var GuestModel = require('mongoose').model('Guest');

exports.createGuest = function (req, res, next) {

    // Create a new instance of the 'Guest' Mongoose model
    var guests = new GuestModel(req.body);
    console.log("body: " + req.body);
    // Use the 'Guest' instance's 'save' method to save a new guests document
    guests.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(guests);

        }
    });
};

// Create a new 'getGuest' controller method
exports.getGuests = function (req, res, next) {
    console.log("controller", "getGuests");
    // Use the 'GuestModel' instance's 'find' method to retrieve a new guests document
    GuestModel.find({}, function (err, guests) {
        if (err) {
            return next(err);
        } else {
            res.json(guests);
        }
    });
};

exports.getGuestByGuestId = function (req, res, next) {
    GuestModel.findOne({ _id: req.body.guestId }, function (err, guest) {
        if (err) {
            return next(err);
        } else {
            res.json(guest);
        }
    });
};