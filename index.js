const functions = require('firebase-functions');
const app = require('./src/app');

exports.demoapp = functions.https.onRequest(app);
