const functions = require('firebase-functions');
const app = require('./backend/app');

exports.demoapp = functions.https.onRequest(app);
