const expect = require('expect.js');

const github = require('../lambda/lib/github');

process.env.authenticationUrl = 'https://test.example.com/oauth/access_token';
process.env.client_id = 'testclientid';
process.env.client_secret = 'testclientsecret'

describe('Lambda GitHub', () => {
    beforeEach('mock sender', () => {
        github.send = () => {
            return Promise.resolve();
        };
    });

    describe('authenticate', () => {
        const code = 'abcdefg12345678';
        const state = 'testingstate';

        it('should return a promise', () => {
            result = github.authenticate(code, state);
            expect(result).to.be.a(Promise);
        });
    });

    describe('getUser', () => {
        const token = 'token abcdefg12345678';

        it('should return a promise', () => {
            result = github.getUser(token);
            expect(result).to.be.a(Promise);
        });
    });

    describe('checkMembership', () => {
        const token = 'token abcdefg12345678';
        const username = 'tester';

        it('should return a promise', () => {
            result = github.checkMembership(token, username);
            expect(result).to.be.a(Promise);
        });
    });

    describe('verifyUser', () => {
        const token = 'token abcdefg12345678';
        const info = { login: 'test' }

        beforeEach('mock sender', () => {
            github.send = () => {
                return Promise.resolve(info);
            };
        });

        it('should return a promise', () => {
            result = github.verifyUser(token);
            expect(result).to.be.a(Promise);
        });
    });
});
