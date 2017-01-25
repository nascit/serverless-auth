'use strict';

const signupHandler = require('./lib/handlers/signupHandler');
const signinHandler = require('./lib/handlers/signinHandler');
const helloHandler = require('./lib/handlers/hello');
//const callbackHandler = require('./lib/handlers/callbackHandler');
const refreshHandler = require('./lib/handlers/refreshHandler');
//const authorizeHandler = require('./lib/handlers/authorizeHandler');

module.exports.signup =
  (event, context) =>
    signupHandler(event, context);

module.exports.signin =
  (event, context, cb) =>
    signinHandler(event, cb);

module.exports.hello =
  (event, context, cb) =>
    helloHandler(event, cb);

/*
module.exports.callback =
  (event, context) =>
    callbackHandler(event, context);
*/
module.exports.refresh =
  (event, context, cb) =>
    refreshHandler(event, cb);
/*
module.exports.authorize =
  (event, context, cb) =>
    authorizeHandler(event, cb);
*/
