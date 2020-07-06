const mongoose = require('mongoose')
const URI = 'mongodb://localhost/redesocial';

// Creating of connection with the database
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;