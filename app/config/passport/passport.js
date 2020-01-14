  var models = require("../../models");
  //load bcrypt
  var bCrypt = require('bcrypt-nodejs');
  const memshared = require('memshared');
  module.exports = function(passport,user){

  var User = user;
  var LocalStrategy = require('passport-local').Strategy;

  passport.serializeUser(function(data, done) {
          done(null, data.id);          
      });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {    
      User.findById(id).then(function(data) {
        if(data){
          done(null, data.get());
        }
        else{
          done(data.errors,null);
        }
      });
  });

  passport.use('local-signup', new LocalStrategy(
    {
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
    },

    function(req, username, password, done){

      var generateHash = function(password) {
      return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
      };

     User.findOne({where: {username:username}}).then(function(data){
      if(data)
      {
        return done(null, false, {message : 'That username is already taken'} );
      }
      else
      {
        var userPassword = generateHash(password);
        var datasignup =
        { username:username,
          password:userPassword,
          firstname: req.body.firstname,
          lastname: req.body.lastname
        };

        User.create(datasignup).then(function(newUser,created){
          if(!newUser){
            return done(null,false);
          }
          if(newUser){
            return done(null,newUser);
          }
        });
      }
    });
  }
  ));

  //LOCAL SIGNIN
  passport.use('local-signin', new LocalStrategy(
  {
  // by default, local strategy uses username and password, we will override with username
  usernameField : 'username',
  passwordField : 'password',
  passReqToCallback : true // allows us to pass back the entire request to the callback
  },

  function(req, username, password, done) {
    var User = user;
    var isValidPassword = function(userpass,password){
      return bCrypt.compareSync(password, userpass);
    }
    User.findOne({ where : { username: username}, include: [ {model:models.department}] }).then(function (data) {
      if (!data) {
        return done(null, false, { message: 'username does not exist' });
      }
      if (!isValidPassword(data.password,password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      var userinfo = data.get();
      req.session.userauth = userinfo;
      memshared.set('userauth', userinfo);
      return done(null,userinfo);

    }).catch(function(err){
      return done(null, false, { message: 'Something went wrong with your Signin' });
    });
  }
  ));

  }
