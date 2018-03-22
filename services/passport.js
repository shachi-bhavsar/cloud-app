const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.serializeUser((user,done) => {
    //console.log("user: "+user.id)
    done(null,user.id)
})

passport.deserializeUser((id,done) => {
    //console.log(id)
    User.findById(id)
    .then( user => {
        done(null,user)
    })
})

passport.use(new GoogleStrategy(
    {
        clientID : keys.googleClientID,
        clientSecret : keys.googleClientSecret,
        callbackURL : '/auth/google/callback'
    },
    (accessToken,refreshToken,profile,done) => {
        User.findOne({ googleId : profile.id })
        .then(ExistingUser => {
            if(ExistingUser)
            {
                done(null,ExistingUser)
            }
            else
            {
                new User({googleId : profile.id}).save()
                .then(
                    newUser => done(null,newUser)
                )
            }
        })
    }
))