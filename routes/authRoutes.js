const passport = require('passport')

//command to check post request
//curl -X POST "http://localhost:3000/auth/google"
// if app.post('/auth/google') is specified
//app.get('/things/:id([0-9]{5})') this will allows 5 digit id as url
module.exports = (app) => {

    app.get('/auth/google', passport.authenticate('google',{
        scope : ['profile','email','https://www.googleapis.com/auth/plus.login']
    }))

    app.get('/auth/google/callback',passport.authenticate('google'))

    app.get('/api/logout' , (req,res) => {
        //console.log(req.user)
        req.logout()
        res.send(req.user)
    })

    app.get('/api/current_user', (req,res) => {
        res.setHeader('content-type', 'application/json');
        res.send(req.user)
    })
}
