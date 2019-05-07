const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const app = express();

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`*** Server running on port ${port} ...`);
});


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => { console.log("*** MongoDB Connected!"), console.log('*** Ctrl+C to stop!') })
  .catch(err => console.log(err));
