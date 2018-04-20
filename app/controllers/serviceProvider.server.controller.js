var ServiceProviderModel = require('mongoose').model('ServiceProvider');

exports.createServiceProvider = function (req, res, next) {

    var serviceProvider = new ServiceProviderModel(req.body);
    serviceProvider.save(function (err) {
        if (err) {
            return next(err);
        } else {
            res.json(serviceProvider);
        }
    });
};

exports.getServiceProviders = function (req, res, next) {
    ServiceProviderModel.find({}, function (err, serviceProviders) {
        if (err) {
            return next(err);
        } else {
            res.json(serviceProviders);
        }
    });
};

exports.getServiceProviderById = function (req, res, next) {
    ServiceProviderModel.findOne({ userId: req.user._id }, function (err, serviceProvider) {
        if (err) {
            return next(err);
        } else {
            next(serviceProvider)
        }
    });
};

exports.getProviderByUserId = function (req, res, next) {

    console.log("controller log : " + req)

    ServiceProviderModel.findOne({ userId: req._id }, function (err, serviceProvider) {
        if (err) {
            return next(err);
        } else {
            res.json(serviceProvider)
        }
    });
};