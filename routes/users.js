var express = require('express');

/* token service */
var token_service = require('../service/token_service.js');

var User = require('../model/user'); // get our mongoose model

var router = express.Router();

router.post('/signup', function(req, res) {
    
    console.log(req.body);
    
    if (!req.body.password)
        res.send({ success: false, message: 'You must enter a password.' });
    else if (req.body.password != req.body.rpassword)
        res.send({ success: false, message: 'Passwords don\'t match.' });
    else if (!req.body.username)
        res.send({ success: false, message: 'You must enter your username.' });
    else{
        
        // find the user
        User.findOne({username: req.body.username}, function(err, user) {
            
            if (err) throw err;
            
            if (!user) {

                var user = new User({
                    username: req.body.username,
                    password: req.body.password,
                    provider: 'local'
                });

                user.save(function(err,user){
                    user.password = '';
                    return res
                        .status(200)
                        .send({success: true, token: token_service.createToken(user), user: user});
                });

            }else {
                 res.send({ success: false, message: 'User exists.' });
            }
        });
        
    }
});


// route to authenticate a user
router.post('/login', function(req, res) {

  console.log(req.body);
    
  // find the user
  User.findOne({
    username: req.body.username,
    provider: 'local'
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = token_service.createToken(user);
          
        user.password = '';

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          user: user
        });
      }   

    }

  });
});

// route to return all users (GET http://localhost:8080/users/list)
router.get('/list', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
}); 

module.exports = router;