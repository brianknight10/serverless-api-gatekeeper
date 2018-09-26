const expect = require('expect.js');

const utils = require('../lambda/lib/utils');

describe('Lambda Utils', () => {

    describe('response', () => {
        const status = 200;
        const body = { test: 'value', another: 'test' }

        const response = utils.response(status, body);

        it('should return an object', () => {
            expect(response).to.be.an('object');
        });

        it('should return the status code', () => {
            expect(response.statusCode).to.eql(status);
        });

        it('should return the body', () => {
            const json = JSON.parse(response.body);
            expect(json).to.eql(body);
        });

        it('should return no headers if allowedOrigins environment variable is unset', () => {
            expect(response.headers).to.eql({});
        });

        it('should return the correct CORS headers if allowedOrigins is set', () => {
            process.env.allowedOrigins = '*';
            const corsResponse = utils.response(status, body);
            expect(corsResponse.headers).to.eql(
                { 'Access-Control-Allow-Origin': process.env.allowedOrigins }
            );
        });
    });

    describe('successResponse', () => {
        const body = { test: 'value', another: 'test' }

        const response = utils.successResponse(body);

        it('should return an object', () => {
            expect(response).to.be.an('object');
        });

        it('should return the status code', () => {
            expect(response.statusCode).to.eql(200);
        });

        it('should return the body', () => {
            const json = JSON.parse(response.body);
            expect(json).to.eql(body);
        });
    });

    describe('unauthorizedResponse', () => {
        const body = { test: 'value', another: 'test' }

        const response = utils.unauthorizedResponse(body);

        it('should return an object', () => {
            expect(response).to.be.an('object');
        });

        it('should return the status code', () => {
            expect(response.statusCode).to.eql(401);
        });

        it('should return the body', () => {
            const json = JSON.parse(response.body);
            expect(json).to.eql(body);
        });
    });

    describe('respond with success', () => {
        const body = { access_token: 'test' }

        const response = utils.respond(body);

        it('should return an object', () => {
            expect(response).to.be.an('object');
        });

        it('should return the status code', () => {
            expect(response.statusCode).to.eql(200);
        });

        it('should return the body', () => {
            const json = JSON.parse(response.body);
            expect(json).to.eql(body);
        });
    });

    describe('respond with error', () => {
        const body = { error: 'test' };

        const response = utils.respond(body);

        it('should return an object', () => {
            expect(response).to.be.an('object');
        });

        it('should return the status code', () => {
            expect(response.statusCode).to.eql(401);
        });

        it('should return the body', () => {
            const json = JSON.parse(response.body);
            expect(json).to.eql(body);
        });
    });

    describe('stripToken', () => {
        const token = 'token 12345678abcdefg';

        const response = utils.stripToken(token);

        it('should strip the token type', () => {
            expect(response).to.eql('12345678abcdefg');
        });
    })
});
