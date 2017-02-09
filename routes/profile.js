const express = require('express');
const request = require('request');
const router = express.Router();
const Profile = require('../models/profile')

router.get('/', (req, res, next) => {
  const user = req.session.user;
  console.log('PROFILE.JS > user ===> ', user);
  res.render('index', {user});
});

router.get('/me', (req, res, next) => {
  const access_token = req.session.access_token;
  const url = "https://www.googleapis.com/plus/v1/people/me";
  const options = {
    method: 'GET',
    url: url,
    headers: { 'authorization' : `Bearer ${access_token}`}
  }
  console.log('PROFILE.JS > options ===>', options);
  request(options, (err, response, body) => {
    const user = JSON.parse(body);
    req.session.user = user;
    Profile.findOne({"email": user.emails[0].value}, (err,profile)=> {
      if(!profile){
      var profile1 = new Profile({
           displayName: user.displayName,
           email: user.emails[0].value
           // avatar: user.image
          })
          profile1.save()
      }
    })
      console.log('rsu=', user);

       res.redirect('/stories')
  })
});


router.get('/:id', (req,res,next) => {
  // grab profile of specific user
  res.render('index');
});

router.get('/:id/edit', (req,res,next) => {
  // display fields to edit
  res.render('edit');
});

router.put('/:id', (req,res,next) => {
  // update profile in mongo
  res.redirect('/:id')   // either redirect or render.
})

module.exports = router;
