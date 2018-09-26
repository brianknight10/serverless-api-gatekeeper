'use strict';

const aws = require('./lib/aws');
const github = require('./lib/github');
const utils = require('./lib/utils');

module.exports.handler = (event, context, callback) => {
    const token = utils.stripToken(event.authorizationToken);
    
    return Promise.resolve()
        .then(() => { 
            return github.verifyUser(token);
        })
        .then((data) => {
            const policy = aws.genericPolicy(data);
            callback(null, policy);
        })
        .catch((err) => {
            console.log(err);
            callback('Unauthorized', null);
        });
};