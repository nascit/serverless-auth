'use strict';

// Config
const slsAuth = require('serverless-authentication');
//const config = slsAuth.config;
const utils = slsAuth.utils;

var AWSCognito = require('aws-sdk');
var CognitoSDK = require('amazon-cognito-identity-js-node');

AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails = CognitoSDK.AuthenticationDetails;
AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool = CognitoSDK.CognitoUserPool;
AWSCognito.CognitoIdentityServiceProvider.CognitoUser = CognitoSDK.CognitoUser;
AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute = CognitoSDK.CognitoUserAttribute;

// Providers
//const facebook = require('serverless-authentication-facebook');
//const google = require('serverless-authentication-google');
//const microsoft = require('serverless-authentication-microsoft');
//const customGoogle = require('../custom-google');

// Common
const cache = require('../storage/cacheStorage');

//const redirectProxyCallback = require('../helpers').redirectProxyCallback;

/**
 * Sign In Handler
 * @param proxyEvent
 * @param context
 */
function signinHandler(proxyEvent, callback) {
  console.log(proxyEvent)
  console.log(proxyEvent.username)
  const event = {
    //provider: proxyEvent.pathParameters.provider,
    //stage: proxyEvent.requestContext.stage,
    //host: proxyEvent.headers.Host
  };

  //const providerConfig = config(event);

  var authenticationData = {
      Username : 'timoteo.alvarenga',
      Password : 'ganso1989',
  };
  var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
  var poolData = { UserPoolId : 'us-east-1_OjyyFWVMY',
      ClientId : '18ph29v9jpfv1oeu2nn6lnr5n0'
  };
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  var userData = {
      Username : 'timoteo.alvarenga',
      Pool : userPool
  };
  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('access token: + ' + result.getAccessToken().getJwtToken());
            // create a response
            const response = {
              statusCode: 200,
              body: JSON.stringify({
                idToken: result.idToken.jwtToken,
                accessToken: result.getAccessToken().getJwtToken()
              }),
            };

            /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
            console.log('idToken: + ' + result.idToken.jwtToken);
            callback(null, response);
        },
        onFailure: function(err) {
            console.log(err);
        },
  });

}

exports = module.exports = signinHandler;
