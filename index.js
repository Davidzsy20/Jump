const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const requireLogin = require('./middleware/requireLogin');
require('./models/User');
require("passport")
require('./services/passport');

mongoose.connect(keys.mongoURI);


const app = express();
//parse the body to req.body
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookiekey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

if( process.env.NODE_ENV ==='production') {
    //Express will serve up production assets
    //like our main.js file, or main.css file!
    const path = require ('path');
    app.use(express.static(path.join(__dirname, 'client/build')));

    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);