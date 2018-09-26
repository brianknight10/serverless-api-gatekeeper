'use strict';

// local reference to this module
const utils = module.exports;

/**
 * Examines a GitHub token response and returns an HTTP response.
 * 
 * @method respond
 * @param {Object} response The body of the response
 * @return {Object} The response object
 */
module.exports.respond = (response) => {
    if (response.access_token) {
        return utils.successResponse(response);
    } else {
        return utils.unauthorizedResponse(response);
    }
};

/**
 * Returns an HTTP response object including the provided body.
 * 
 * @method response
 * @param {number} status The status code of the HTTP response
 * @param {Object} body The body of the response
 * @return {Object} The response object
 */
module.exports.response = (status, body) => {
    const allowedOrigins = process.env.allowedOrigins;
    const headers = allowedOrigins ? { 'Access-Control-Allow-Origin': allowedOrigins } : {};
    return { statusCode: status, headers, body: JSON.stringify(body) };
};

/**
 * Strips the token type from the provided token value, if present.
 * 
 * @method stripToken
 * @param {string} token The provided token value
 * @return {string} The stripped token
 */
module.exports.stripToken = (token) => {
    const re = /(\S+)$/;
    return token.match(re)[0];
};

/**
 * Returns a successful HTTP response object (200) including the provided body.
 * 
 * @method successResponse
 * @param {Object} body The body of the response
 * @return {Object} The response object
 */
module.exports.successResponse = (body) => {
    return utils.response(200, body);
};

/**
 * Returns a unauthorized HTTP response object (401) including the provided body.
 * 
 * @method unauthorizedResponse
 * @param {Object} body The body of the response
 * @return {Object} The response object
 */
module.exports.unauthorizedResponse = (body) => {
    return utils.response(401, body);
};