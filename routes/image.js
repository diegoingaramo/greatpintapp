var express = require('express');

/* token service */
var token_service = require('../service/token_service.js');

var User = require('../model/user'); // get our mongoose model
var Image = require('../model/image'); // get our mongoose model

var ObjectId = require('mongoose').Types.ObjectId;

var router = express.Router();

router.post('/save', token_service.isAuthenticated, function(req, res) {
    
    console.log(req.body);
    
    if (!req.body.image.title)
        res.send({ success: false, message: 'You must enter a title' });
    else if (!req.body.image.url)
        res.send({ success: false, message: 'You must enter an URL' });
    else{
        
            var image = new Image({
                title: req.body.image.title,
                url: req.body.image.url,
                owner: new ObjectId(req.body.user._id)
            });

            image.save(function(err,user){
                if (err) throw err;
                return res
                    .status(200)
                    .send({success: true});
            });

        };
});


// route to return all images (GET http://localhost:8080/users/list)
router.get('/list', function(req, res) {
  Image.find({}, function(err, users) {
    res.json(users);
  });
}); 

module.exports = router;