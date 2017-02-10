var express = require('express');
const router = express.Router();
const request = require('request');
const Profile = require('../models/profile');
const wordbank = require('../models/wordbank');
const Story = require('../models/story')

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
    console.log('img_url=', JSON.parse(body).data.image_url);
    var game_words = [];
    // var word = wordbank[randomIndex];
    while(game_words.length < 11){
    var randomIndex = Math.floor(Math.random() * wordbank.length);
    game_words.push(wordbank[randomIndex]);
    }
    console.log('game_words=', game_words);
    res.render('story',{img_url: img_url,
      words1: game_words[0],
      words2: game_words[1],
      words3: game_words[2],
      words4: game_words[3],
      words5: game_words[4],
      words6: game_words[5],
      words7: game_words[6],
      words8: game_words[7],
      words9: game_words[8],
      words10: game_words[9]
    });
  })
});


router.post('/', (req,res,next) => {
  // this is going to go to mongo -- share button
  var img_url = req.body.img_url;
  var caption = req.body.caption;
  var email = req.body.email;
  console.log('img_url=', img_url);
  var story = {
    email: email,
    caption: caption,
    img_url: img_url
  }
  var newStory = new Story(story);
  newStory.save();
  res.redirect('/');
});

router.get('/:id', (req,res,next) => {
  // get other users stories
  var id = req.params.id;
  Story.findById(id, (err, story) => {
    if (err) {
      console.log(err)
    } else {
      console.log(id + ' story found')
    }
  res.render('story', {user: story});
  })
});

router.delete('/:id', (req,res,next) => {
  var id = req.params.id;
  Story.findByIdAndRemove(id, (err, story) => {
    if(err) {
      console.log(err);
    } else {
      console.log('story deleted');
    }
  })
  res.redirect('/');
})





module.exports = router;
