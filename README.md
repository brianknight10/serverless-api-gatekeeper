# API Gatekeeper - made with [![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
Lambda functions providing authentication and authorization for API access.


## How to deploy the project

First, install the Serverless Framework and configure your AWS credentials:


```
$ npm install serverless -g
$ serverless config credentials --provider aws --key XXX --secret YYY
```

Now, you can quickly install this service as follows:

```
$ serverless install -u https://github.com/brianknight10/serverless-api-gatekeeper
```

The Serverless Framework will download and unzip the repository, but it won't install dependencies. Don't forget to install npm dependencies:

```
$ cd serverless-api-gatekeeper
$ npm install
```

Finally, you can deploy everything:

```
$ serverless deploy
```

## Lambda Functions

This project composed of two Lambda Functions:

* **authenticator**: obtain a GitHub access token for a user that has authorized the a GitHub OAuth application.
* **authorizer**: authorizes a valid GitHub token to use API resources
based on an access token.

## Contributing
Contributors and PRs are always welcome!

### Tests and coverage

Install dev dependencies with `npm install --dev`. Then run tests with `npm test`, or coverage with `npm run coverage`.

Current test coverage: 95%.