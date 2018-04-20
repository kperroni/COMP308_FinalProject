// Load the 'User' Mongoose model
var User = require('mongoose').model('User');
const passport = require('passport');

exports.createUser = function (req, res, next) {

    // Create a new instance of the 'User' Mongoose model
    var user = new User(req.body);
    console.log(req.body);

    // Use the 'User' instance's 'save' method to save a new user document
    user.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // If the user was created successfully use the Passport 'login' method to login
            req.login(user, (err) => {
                // If a login error occurs move to the next middleware
                if (err) return next(err);

                // Redirect the user back to the main application page
                res.json(user);
            });
            // Use the 'response' object to send a JSON response
        }
    });
};

// Create a new 'getUsers' controller method
exports.getUsers = function (req, res, next) {
    // Use the 'User' instance's 'find' method to retrieve a new user document
    User.find({}, function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.logIn = function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { res.json({ message: "0" }); }
        else {
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                res.json({ message: "1" });
            });
        }
    })(req, res, next);
}

exports.logOut = function (req, res, next) {
    req.logout();
    res.json({ message: "1" });
}

exports.getUserSession = function (req, res, next) {
    if (req.user) {
        res.json(req.user);
    }
    else {
        res.json(null);
    }
}

// Create a new 'getActiveUser' controller method
exports.getActiveUser = function (req, res, next) {
    console.log("controller", "getActiveUser", req.user.id);
    User.findOne({ _id: req.user.id }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            console.log("ActiveUser", user);
            res.json(user);
        }
    });
};

exports.getUserById = function (req, res, next) {
    console.log("controller", "getUserById", req.body);
    User.findOne({ _id: req.body._id }, function (err, user) {
        if (err) {
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.requiresLogin = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            message: 'User is not logged in'
        });
    }
};

// This function should be inside a controller that defines a function with authorization
// e.g when deleting a ticket
// For the mean time, it will be here. Later on, it will implemented correctly
exports.hasAuthorization = function (req, res, next) {
    if (req.ticket.userId !== req.user._id) {
        return res.status(403).json({
            message: 'User is not authorized'
        });
    }
};
