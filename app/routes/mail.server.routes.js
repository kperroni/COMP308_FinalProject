module.exports = function (app, transporter) {
    //load the controllers
    var mail = require('../controllers/mail.server.controller');
    //handle the routing of get and post request
    app.get('/mail', mail.sendEmail);
};