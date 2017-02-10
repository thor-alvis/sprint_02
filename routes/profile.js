const express = require('express');
const request = require('request');
const router = express.Router();
const Profile = require('../models/profile')
const Story = require('../models/story')

router.get('/all', (req, res, next) => {
  Profile.find({}).exec().then(profiles => {
    res.json(profiles)
  })
});

router.get('/me', (req, res, next) => {
  const access_token = req.session.access_token;
  const url = "https://www.googleapis.com/plus/v1/people/me";
  const options = {
    method: 'GET',
    url: url,
    headers: { 'authorization' : `Bearer ${access_token}`}
  }
  request(options, (err, response, body) => {
    const user = JSON.parse(body);
    req.session.user = user;
    console.log('USER ++>', user)
    Profile.findOne({"email": user.emails[0].value}, (err,profile)=> {
      if(!profile){
        var profile1 = new Profile({
          displayName: user.displayName,
          email: user.emails[0].value,
          id: user.id
        })
        profile1.save()
      }
    });
    res.redirect('/stories');
  });
});

router.get('/:id', (req,res,next) => {
  const id = req.params.id;
  const user = req.session.user;
  Profile.findOne({"id": id}).populate("stories").exec().then(profile => {
    console.log('user', user)
    res.render('profile', {user: profile});
  }).catch(next)
});

module.exports = router;



