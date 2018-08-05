const passport = require('passport');
const mongoose = require('mongoose');
const googleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    //this is a mongo identification. For multiple signin providers.
    done(null, user.id);
});

passport.deserializeUser((id, done) =>{
    User.findById(id)
    .then(user => {
        done(null, user);
    });
});
passport.use(new googleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({
                googleId: profile.id
            })
            .then((existingUser) => {
                if (existingUser) {
                    //we Already have a record
                    done(null, existingUser);

                } else {
                    //make a new record.
                    new User({
                            googleId: profile.id
                        })
                        .save()
                        .then(user => {
                            done(null, user)
                        });
                }
            })
    }));