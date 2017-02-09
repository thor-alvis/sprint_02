var express = require('express');
const router = express.Router();
const request = require('request');
const Profile = require('../models/profile');


router.get('/', (req,res,next) =>{
  Profile.find({}, function (err, user) {
    if (err) {
      next(err)
    } else {
      const user = req.session.user;
      console.log('user', user);
    res.render('index', {user: user}); //list of all stories
    }
  })
});


router.get('/new', (req,res,next) => {
  request.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC', (err, response, body) => {
    console.log('err', err);
    console.log('body 1', JSON.parse(body));
    console.log('body 2', JSON.parse(body).data.image_url);
    const img_url  = JSON.parse(body).data.image_url;
    res.render('story',{img_url: img_url});
  })
});


router.post('/', (req,res,next) => {
  // this is going to go to mongo -- share button
  var img_url = req.body.imgdata;
  var caption = req.body.caption;
  var userName = req.body.userName;
  console.log('img_url=', img_url);
  // res.redirect('/');
});

router.get('/:id', (req,res,next) => {
  // get other users stories
  res.render('story');
});

router.delete('/:id', (req,res,next) => {
  // var id = req.body.id;
  // Profile.findByIdAndRemove(id, (err, data) => {
  //   if(err) {
  //     console.log(err);
  //   } else {
  //     console.log('story deleted');
  //   }
  // })
  res.redirect('/');
})




module.exports = router;
