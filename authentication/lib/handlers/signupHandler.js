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

// Common
const cache = require('../storage/cacheStorage');

/**
 * Sign In Handler
 * @param proxyEvent
 * @param context
 */
function signinHandler(proxyEvent, context) {
  console.log(proxyEvent)
  console.log(proxyEvent.username)

  AWSCognito.config.region = 'us-east-1'; //This is required to derive the endpoint

  var poolData = { UserPoolId : 'us-east-1_OjyyFWVMY',
      ClientId : '18ph29v9jpfv1oeu2nn6lnr5n0'
  };
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

  var attributeList = [];

  var dataEmail = {
      Name : "email",
      Value : "timoteo.alvarenga@kendoo.com.br"
  };
  var dataPhoneNumber = {
      Name : "phone_number",
      Value : "+15555555555"
  };
  var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
  var attributePhoneNumber = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataPhoneNumber);

  attributeList.push(attributeEmail);
  console.log(attributeEmail)
//  attributeList.push(attributePhoneNumber);
//  console.log(attributeList)
//  console.log(attributeList[0])
//  console.log(attributeList[0].Name)
//  console.log(attributeList[0]['Name'])
//  console.log(typeof attributeList[0].Name)

  if (typeof attributeList[0].Name === 'string' || attributeList[0].Name instanceof String)
    // it's a string
    console.log('Its a string')
  else
    console.log('Not a string')

  userPool.signUp('timoteo.alvarenga', 'ganso1989', attributeList, null, function(err, result){
      if (err) {
          console.log(err);
          return;
      }
      var cognitoUser = result.user;
      console.log('user name is ' + cognitoUser.getUsername());
  });

}

exports = module.exports = signinHandler;
