const express = require('express');
const request = require('request');
const router = express.Router();
const Profile = require('../models/profile');
const Story = require('../models/story');

// CONFIG THE CLIENT OBJECT
const client_id = process.env.GOOGLE_CLIENT_ID;
const client_secret = process.env.GOOGLE_CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

// REDIRECT TO GOOGLE OAUTH 2.0 SERVER
router.get('/login', (req, res, next) => {
  const redirect_url = 'https://accounts.google.com/o/oauth2/v2/auth';
  const scope = 'email profile';
  const state = 'dog';
  const response_type = 'code';
  const queryParams = `scope=${scope}&state=${state}&redirect_uri=${redirect_uri}&response_type=${response_type}&client_id=${client_id}`;
  res.redirect(redirect_url + '?' + queryParams);
});

// HANDLE GOOGLE OAUTH 2.0 RESPONSE
router.get('/callback', (req, res, next) => {
  const code = req.query.code;
  const state = req.query.state;
  const url = 'https://www.googleapis.com/oauth2/v4/token'
  const form = {
    code: code,
    client_id: client_id,
    client_secret: client_secret,
    redirect_uri: redirect_uri,
    grant_type: 'authorization_code'
  };
  console.log('AUTH.JS > form ===> ', form)
  request.post(url, {form}, (err, response, body) => {
    const data = JSON.parse(body);
    console.log('AUTH.JS > data ===> ' + data);
    req.session.access_token = data.access_token;
    console.log('AUTH.JS > req.session ===> ', req.session);
    if (code === undefined) {
      res.redirect('/');
    } else {
      // deleted this 'profile/me' as per updated routes..

      res.redirect('/profile/me');
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy( () => {
    res.redirect('/');
  })
})

module.exports = router;




