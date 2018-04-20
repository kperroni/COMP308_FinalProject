module.exports = function (app) {
    //load the controllers
    var ticketController = require('../controllers/ticket.server.controller');
    //handle the routing of get and post request
    app.post('/ticket/createTicket', ticketController.createTicket);

    app.post('/ticket/getCurrentTicket', ticketController.getCurrentTicket);

    app.get('/ticket/getActiveTickets', ticketController.viewActiveTickets);

    app.post('/ticket/updateCurrentTicket', ticketController.updateCurrentTicket);

    app.post('/ticket/viewPrecedingTickets', ticketController.getPrecedingTicketsInQueue);

    app.post('/ticket/getStudentTicket', ticketController.viewStudentTicket);

    app.post('/ticket/getTicketByTicketNumber', ticketController.getTicketByTicketNumber);

    app.post('/ticket/getActiveTicketsInQueue', ticketController.getActiveTicketsInQueue);
};