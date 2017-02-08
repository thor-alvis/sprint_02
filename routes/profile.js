const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', (req, res, next) => {
  const user = req.session.user;
  console.log('PROFILE.JS > user ===> ', user);
  res.render('profile', {user});
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
    return res.redirect('/profile')
  })
});

module.exports = router;
