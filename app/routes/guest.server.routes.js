module.exports = function (app) {
    //load the controllers
    var guest = require('../controllers/guest.server.controller');
    //handle the routing of get and post request
    app.get('/guest/getGuests', guest.getGuests);
    app.post('/guest/createGuest', guest.createGuest);
    app.post('/guest/getGuestByGuestId', guest.getGuestByGuestId);
};