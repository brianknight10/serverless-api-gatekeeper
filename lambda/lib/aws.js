'use strict';

/**
 * Returns a generic AWS API Gateway policy allowing API access.
 * 
 * @method genericPolicy
 * @param {string} principalId The unique id (username) of the requestor
 * @return {Object} JSON object of AWS API Gateway policy
 */
module.exports.genericPolicy = (principalId) => {
    return {
        principalId: principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: "Allow",
                    Resource: process.env.genericApiResourceArn
                }
            ]
        },
    };
};