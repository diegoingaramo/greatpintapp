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

router.post('/searchByUser', function(req, res) {
    
    Image.find({owner: new ObjectId(req.body.user._id)}).sort({dateAdded: -1}).exec(function(err, images) {
            
           if (err) throw err;
        
            return res
                .status(200)
                .send({success: true, images: images});
        
    });
    

});


router.post('/delete', token_service.isAuthenticated, function(req, res) {
    
    Image.findOne({_id: req.body.image._id}).remove(function(err) {
            
       if (err) throw err;
        
           return res
                    .status(200)
                    .send({success: true});
    });
        
});


router.post('/recent', function(req, res) {
    
    Image.find({}).sort({dateAdded: -1}).populate('owner').exec(function(err,images){
            
           if (err) throw err;
        
            return res
                .status(200)
                .send({success: true, images: images});
        
    });
    
});



// route to return all images (GET http://localhost:8080/users/list)
router.get('/list', function(req, res) {
  Image.find({}, function(err, users) {
    res.json(users);
  });
}); 

module.exports = router;