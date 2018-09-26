'use strict';

const request = require('request-promise-native');

// local reference to this module
const github = module.exports;

/**
 * Uses a GitHub code and state to obtain an access token. Analogous to Step 2 in 
 * https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/.
 * 
 * @method authenticate
 * @param {string} code GitHub authentication code
 * @param {string} state An unguessable random string
 * @return {Promise} Promise for response
 */
module.exports.authenticate = (code, state) => {
    const options = {
        method: 'POST',
        uri: process.env.authenticationUrl,
        qs: {
            client_id: process.env.clientId,
            client_secret: process.env.clientSecret,
            code: code,
            state: state
        },
        headers: {
            'Accept': 'application/json'
        },
        json: true
    };

    return github.send(options);
};

/**
 * Verifies user membership in a GitHub team specified in the URL.
 * 
 * @method checkMembership
 * @param {string} token GitHub access token
 * @param {string} username GitHub user name
 * @return {Promise} Promise for response
 */
module.exports.checkMembership = (token, username) => {
    const options = {
        method: 'GET',
        uri: process.env.teamUrlBase + '/memberships/' + username,
        headers: {
            'Authorization': 'token ' + token,
            'User-Agent': 'API-Gatekeeper'
        },
        json: true
    };

    return github.send(options);
};

/**
 * Gets user metadata for the access token user.
 * 
 * @method getUser
 * @param {string} token GitHub access token
 * @return {Promise} Promise for response
 */
module.exports.getUser = (token) => {
    const options = {
        method: 'GET',
        uri: process.env.userUrl,
        headers: {
            'Authorization': 'token ' + token,
            'User-Agent': 'API-Gatekeeper'
        },
        json: true
    };

    return github.send(options);
};

/**
 * Sends a request to GitHub based on supplied options.
 * 
 * @method send
 * @param {Object} options Request options for sending
 * @return {Promise} Promise for response
 */
module.exports.send = (options) => {
    return request(options).promise();
};

/**
 * Verifies the user and membership in a specified team. Returns a promise
 * to obtain the username.
 * 
 * @method verifyUser
 * @param {string} token GitHub access token
 * @return {Promise} Promise for response
 */
module.exports.verifyUser = (token) => {
    let username;

    return Promise.resolve()
        .then(() => {
            return github.getUser(token);
        })
        .then((data) => {
            username = data.login;
            return github.checkMembership(token, username);
        })
        .then(() => {
            return Promise.resolve(username);
        });
};