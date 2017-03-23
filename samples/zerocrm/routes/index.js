var crypto = require('crypto');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var async = require('async');
var extend = require('../lib/extend');
var config = require('../lib/config');

router.use(function (req, res, next) {
    // Establish the ZeroCRM tenant this operation is running on behalf of. 
    // In production, this would be typically derived from the authentication context.
    // In this demo, the tenant to use is explicitly specified through configuration.

    req.zerocrmTenant = config.zerocrmTenant;
    return next();
});

router.get('/', function(req, res) {
    res.render('index', { });
});

router.get('/settings', function(req, res, next) {
    // Documentation: https://github.com/auth0/extend/wiki/Auth0-Extend-User%27s-Guide#mapping-isolation-requirements-onto-webtask-tokens

    return async.waterfall([
        (cb) => extend.mapTenantToIsolationScope(req.zerocrmTenant, cb),
        (webtaskContext, cb) => res.render('settings', { 
            webtaskContext: webtaskContext, 
            randomBytes: crypto.randomBytes(32).toString('hex')
        })
    ], next);
});

router.post('/api/leads', bodyParser.json(), function (req, res, next) {
    // Documentation: https://github.com/auth0/extend/wiki/Auth0-Extend-User%27s-Guide#invoking-extensions

    return async.waterfall([
        (cb) => extend.mapTenantToIsolationScope(req.zerocrmTenant, cb),
        (webtaskContext, cb) => extend.discoverExtensions(webtaskContext, 'on-new-lead', cb),
        (extensions, cb) => extend.invokeExtension(extensions, req.body, cb),
        (result, cb) => {
            // This is the place where any application-specific processing of the 
            // augmented information about the new lead would be implemented. 
            // In this sample the new lead information is simply returned to the caller. 
            res.status(result.statusCode || 200).json(result);
        }
    ], next);
});

module.exports = router;
