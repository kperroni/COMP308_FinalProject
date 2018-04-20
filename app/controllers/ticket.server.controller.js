// Load the 'Ticket' Mongoose model
var Mongoose = require('mongoose');
var Ticket = Mongoose.model('Ticket');
var User = Mongoose.model('User');
var Guest = Mongoose.model('Guest');
var Service = Mongoose.model('Service');
var Queue = Mongoose.model('Queue');
var ObjectId = require('mongodb').ObjectId;
var Student = Mongoose.model('Student');
var mail = require('./mail.server.controller');

exports.createTicket = function (req, res, next) {
    console.log("Ticket Controller");

    // verify it the user is logged in
    if (req.user.id == null) {
        return res.json({ message: "0", err: "you must login first" });
    }

    Ticket.findMax(function (err, ret) {     // get the maximum number of ticket
        if (err) {
            return res.json({ message: "0", err: err });
        } else {
            if (ret) {
                req.body.ticket.ticketNumber = ret.ticketNumber + 1; // next ticket
            } else {
                req.body.ticket.ticketNumber = 1;   // first ticket
            }

            Service.findById(req.body.ticket.serviceId, function (err, service) {
                if (err) {
                    return res.json({ message: "0", err: err });
                } else {

                    req.body.ticket.weight = req.body.ticket.ticketNumber - service.weight + service.averageMinutes;
                    req.body.ticket.userId = req.user.id;   // set the loged user id

                    if (req.body.guest != null) { // if we need to inser fisrt the guest
                        var guest = new Guest(req.body.guest);
                        guest.save(function (err, ret) { // save the new guest
                            if (err) {
                                return res.json({ message: "0", err: err });
                            } else {
                                console.log("guest", ret);
                                req.body.ticket.guestId = ret._id;      // set the guest id in the ticket
                                var ticket = new Ticket(req.body.ticket);
                                ticket.save(function (err) {                        // save the ticket after the guest
                                    if (err) {
                                        return res.json({ message: "0", err: err });
                                    } else {
                                        var socketIo = req.app.get('socketIo');
                                        console.log("Before emitting");
                                        socketIo.sockets.emit('ticket.created', ticket);
                                        res.json({ message: "1", ticketNumber: req.body.ticket.ticketNumber });
                                    }
                                });
                            }
                        });
                    } else {
                        var ticket = new Ticket(req.body.ticket);
                        ticket.save(function (err) {                        // save the ticket without any guest
                            if (err) {
                                return res.json({ message: "0", err: err });
                            } else {
                                var socketIo = req.app.get('socketIo');
                                console.log("Before emitting");
                                socketIo.sockets.emit('ticket.created', ticket);
                                res.json({ message: "1", ticketNumber: req.body.ticket.ticketNumber });
                            }
                        });
                    }
                }
            });
        }
    });
};

exports.getCurrentTicket = function (req, res, next) {
    console.log("body", req.body);
    Ticket.aggregate([
        {
            "$match": { "status": 'A' }
        },
        {
            "$lookup": {
                "from": "services",
                "localField": "serviceId",
                "foreignField": "_id",
                "as": "services"
            }
        },
        {
            "$unwind": {
                "path": "$services"
            }
        },
        {
            "$redact": {
                "$cond": {
                    "if": {
                        "$eq": ["$services.queueId", ObjectId(req.body.queueId)]
                    },
                    "then": "$$KEEP",
                    "else": "$$PRUNE"
                }
            }
        },
        {
            "$sort": {
                'weight': 1,
                'ticketNumber': 1
            }
        },
        {
            "$limit": 1
        }
    ], function (err, tickets) {
        if (err) {
            return next(err);
        } else {
            console.log("tickets", tickets);
            res.json(tickets);
        }
    });
};

exports.updateCurrentTicket = function (req, res, next) {
    const ret = {};

    var query = { "ticketNumber": req.body.ticketNumber },
        updateQ = {
            '$set': { 'status': req.body.status, 'serviceId': req.body.serviceId },
            '$addToSet': { 'details': { 'shiftId': req.body.currentShiftId, 'actions': req.body.detailActions } }
        },
        options = { new: true };

    Ticket.findOneAndUpdate(query, updateQ, options, function (err, retobj) {
        if (err) {
            return res.json({ message: "0", err: err });
        } else {
            sendNotification(req.body.serviceId);
            res.json({ message: "1", ticket: retobj });
        }
    });
};

exports.viewActiveTickets = function (req, res, next) {

    // Use the 'User' instance's 'find' method to retrieve a new user document
    Ticket.find({
        status: 'A'
    }).sort({ "weight": 1, "ticketNumber": 1 }).exec(function (err, users) {
        if (err) {
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.getActiveTicketsInQueue = function (req, res, next) {
    Ticket.aggregate([
        {
            "$match": { "status": 'A' }
        },
        {
            "$lookup": {
                "from": "services",
                "localField": "serviceId",
                "foreignField": "_id",
                "as": "services"
            }
        },
        {
            "$unwind": {
                "path": "$services"
            }
        },
        {
            "$redact": {
                "$cond": {
                    "if": {
                        "$eq": ["$services.queueId", ObjectId(req.body.queueId)]
                    },
                    "then": "$$KEEP",
                    "else": "$$PRUNE"
                }
            }
        },
        {
            "$sort": {
                'weight': 1,
                'ticketNumber': 1
            }
        }
    ], function (err, tickets) {
        if (err) {
            return next(err);
        } else {
            if (req.callback) {
                next(tickets);
            } else {
                res.json(tickets);
            }
        }
    });
}

exports.getPrecedingTicketsInQueue = function (req, res, next) {

    Ticket.aggregate([
        {
            "$match": { "status": 'A' }
        },
        {
            "$lookup": {
                "from": "services",
                "localField": "serviceId",
                "foreignField": "_id",
                "as": "services"
            }
        },
        {
            "$unwind": {
                "path": "$services"
            }
        },
        {
            "$redact": {
                "$cond": {
                    "if": {
                        "$eq": ["$services.queueId", ObjectId(req.body.queueId)]
                    },
                    "then": "$$KEEP",
                    "else": "$$PRUNE"
                }
            }
        },
        {
            "$sort": {
                'weight': 1,
                'ticketNumber': 1
            }
        }
    ], function (err, tickets) {
        if (err) {
            return next(err);
        } else {
            if (req.callback) {
                next(tickets);
            } else {
                res.json(tickets);
            }
        }
    });
}

exports.viewStudentTicket = function (req, res, next) {
    var student = req.body;

    // Use the 'User' instance's 'find' method to retrieve a new user document
    Ticket.findOne({
        status: 'A',
        studentId: student._id,
        studentId: { $ne: null }
    }, function (err, ticket) {
        if (err) {
            return next(err);
        } else {
            res.json(ticket);
        }
    });
}

exports.getTicketByTicketNumber = function (req, res, next) {
    Ticket.findOne({ ticketNumber: req.body.ticketNumber }).exec(function (err, ticket) {
        const ret = {};
        if (err) {
            return res.json({ message: "0", err: err });
        } else {
            res.json(ticket);
        }
    });
};

var sendNotification = function (serviceId) {
    const ticketsLimit = 3;
    Service.findById(serviceId, function (err, service) {
        console.log("sendNotification", "service", service);
        if (!err) {
            var req = {
                body: { queueId: service.queueId },
                callback: true
            }
            var res = {};
            module.exports.getActiveTicketsInQueue(req, res, function (tickets) {
                console.log("tickets in Queue", tickets.length);

                notificableTickets = [];
                for (var i = 0; i < ticketsLimit && i < tickets.length; i++) {
                    notificableTickets.push(tickets[i]);
                }

                console.log("array", notificableTickets);

                notificableTickets.forEach(ticket => {

                    console.log("ticket.studentId:", ticket.studentId);

                    if (ticket.studentId != null) {
                        Student.findOne({ _id: ticket.studentId }, function (err, student) {
                            if (!err) {
                                User.findOne({ _id: student.userId }, function (err, user) {
                                    if (!err) {
                                        reqMail = {
                                            to: user.email,
                                            subject: "Qme (no reply) - Ticket notification",
                                            text: "Hello " + user.firstName + ", \n" +
                                                "Your ticket number " + ticket.ticketNumber + " is close to be called, please approach to the service area."
                                        }
                                        mail.sendEmail(reqMail, null, null);
                                    }
                                })
                            }

                        });
                    }

                    if (ticket.guestId != null) {
                        console.log("guestId", ticket.guestId);
                        Guest.findOne({ _id: ticket.guestId }, function (err, guest) {
                            if (guest.email != null) {
                                reqMail = {
                                    to: guest.email,
                                    subject: "Qme (no reply) - Ticket notification",
                                    text: "Hello " + guest.firstName + ", \n" +
                                        "Your ticket number " + ticket.ticketNumber + " is close to be called, please approach to the service area."
                                }
                                mail.sendEmail(reqMail, null, null);
                            }
                        });
                    }

                });

            });

        }
    });
}
