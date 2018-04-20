var ShiftModel = require('mongoose').model('Shift');
var ServiceProvider = require('./serviceProvider.server.controller');

exports.createShift = function (req, res, next) {
    var shift = new ShiftModel(req.body);
    ServiceProvider.getServiceProviderById(req, res, (serviceProviderData) => {
        shift.serviceProviderId = serviceProviderData._id;
        shift.save(function (err) {
            if (err) {
                return next(err);
            } else {
                res.json({ message: "Shift Successfully Started" });
            }
        });
    });
};

exports.checkShift = function (req, res, next) {
    ServiceProvider.getServiceProviderById(req, res, (serviceProviderData) => {
        ShiftModel.find({ serviceProviderId: serviceProviderData._id, shiftFinish: null}, function (err, shifts) {
            if (err) {
                return next(err);
            } else {
                res.json(shifts);
            }
        });
    });
};

exports.getShifts = function (req, res, next) {
    ShiftModel.find({}, function (err, shifts) {
        if (err) {
            return next(err);
        } else {
            res.json(shifts);
        }
    });
};

exports.finishShift = function (req, res, next){
    ServiceProvider.getServiceProviderById(req, res, (serviceProviderData) => {
        ShiftModel.update({ serviceProviderId: serviceProviderData._id, shiftFinish: null}, { $set: { shiftFinish: new Date }}, function (err, shift){
            if (err) {
                return next(err);
            } else {
                res.json({message: "Shift Successfully Finished"});
            }
        });
    });
};