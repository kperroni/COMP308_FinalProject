const transporter = require('../config/email');

exports.sendEmail = function (req, res, next) {
    var mailOptions = {
        from: 'qmenotifier@gmail.com',
        to: req.to,
        subject: req.subject,
        text: req.text
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};