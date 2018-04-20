module.exports = function (app) {
    //load the controllers
    var shift = require('../controllers/shift.server.controller');
    //handle the routing of get and post request
    app.get('/shift/getShifts', shift.getShifts);
    app.post('/shift/createShift', shift.createShift);
    app.get('/shift/checkShift', shift.checkShift);
    app.put('/shift/finishShift', shift.finishShift);
};