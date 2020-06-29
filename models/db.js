const mongoose = require('mongoose');

const connectUrl = 'mongodb+srv://dbUser:dbUserPass@assignment-wnmbs.mongodb.net/assignment?retryWrites=true&w=majority';

mongoose.connect(connectUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeded.') }
    else { console.log('Error in DB connection :' + err) }
});

require('./product.model');
exports.connectUrl = connectUrl;