'use strict';

const github = require('./lib/github');
const utils = require('./lib/utils');

module.exports.handler = (event, context, callback) => {
    const code = event.queryStringParameters.code;
    const state = event.queryStringParameters.state;

    return Promise.resolve()
        .then(() => {
            return github.authenticate(code, state);
        })
        .then((data) => {
            const response = utils.respond(data);
            callback(null, response);
        })
        .catch(callback);
};