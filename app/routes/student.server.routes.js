module.exports = function (app) {
    //load the controllers
    var student = require('../controllers/student.server.controller');
    //handle the routing of get and post request
    app.get('/student/getStudents', student.getStudents);
    app.post('/student/getStudentByUserId', student.getStudentByUserId);
    app.post('/student/getStudentByStudentId', student.getStudentByStudentId);
    app.post('/student/getStudentByStudentNumber', student.getStudentByStudentNumber);
    app.post('/student/createStudent', student.createStudent);
};