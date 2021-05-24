const { Router, request } = require("express");
var bodyParser=require("body-parser");
var passport = require("passport");
const { updateUser } = require('../../controllers/auth_controller')
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const route = Router();
route.use(passport.initialize());
route.use(passport.session());

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({
	extended: true
}));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "284566297204-he05m42igl10jv2euiqpcb4o954u4qq0.apps.googleusercontent.com",
      clientSecret: "QVPP9b7Or7cKmUxhUssezPxr",
      callbackURL: "http://localhost:9000/auth/login/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      updateUser(profile, (updatedprofile) => {
             return done(null, updatedprofile);
           });
    }
  )
);

route.get(
  "/login",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login",
    'https://www.googleapis.com/auth/userinfo.email']
  })
);


route.get(
  "/login/callback",
  passport.authenticate("google", {
    failureRedirect: "localhost:9000/auth/login/" }),
  function (req, res) {
    res.send({
          "status": 200,
          "message": "successful login",
          "profile": req.user
        })
  }
);

route.get('/current_user',(req,res) => {
  console.log(req.user)
  res.send(req.user)
})

route.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/')
})

module.exports = route;