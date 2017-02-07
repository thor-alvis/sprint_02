var express = require('express');
const router = express.Router();
const request = require('request');



router.get('/new', (req,res,next) => {
  request.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC', (err, response, body) => {
    console.log('err', err);
    console.log('body', JSON.parse(body));
    console.log('body', JSON.parse(body).data.image_url);
    const img_url  = JSON.parse(body).data.image_url;
    res.render('story',{img_url: img_url});
  })
})



module.exports = router;
