// Load the 'Student' Mongoose model
var StudentModel = require('mongoose').model('Student');

exports.createStudent = function (req, res, next) {

    // Create a new instance of the 'Student' Mongoose model
    var student = new StudentModel(req.body);
    console.log("body: " + req.body);
    // Use the 'Student' instance's 'save' method to save a new Student document
    student.save(function (err) {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.json(student);

        }
    });
};

// Create a new 'getstudents' controller method
exports.getStudents = function (req, res, next) {
    console.log("controller", "getStudents");
    // Use the 'student' instance's 'find' method to retrieve a new student document
    StudentModel.find({}, function (err, students) {
        if (err) {
            return next(err);
        } else {
            res.json(students);
        }
    });
};

exports.getStudentByUserId = function (req, res, next) {
    console.log("controller", "req.body", req.body);
    StudentModel.findOne({ userId: req.body.id }, function (err, student) {
        if (err) {
            return next(err);
        } else {
            res.json(student);
        }
    });
};

exports.getStudentByStudentId = function (req, res, next) {
    console.log("controller", "req.body", req.body);
    console.log("request is : " + req);
    StudentModel.findOne({ _id: req.body.studentId }, function (err, student) {
        if (err) {
            return next(err);
        } else {
            res.json(student);
        }
    });
};

exports.getStudentByStudentNumber = function (req, res, next) {
    console.log("controller", "req.body", req.body);
    StudentModel.findOne({ studentNumber: req.body.studentNumber }, function (err, student) {
        if (err) {
            return next(err);
        } else {
            res.json(student);
        }
    });
};

