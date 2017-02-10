var express = require('express');
const router = express.Router();
const request = require('request');
const Profile = require('../models/profile');
const wordbank = require('../models/wordbank');
const Story = require('../models/story')

router.get('/', (req,res,next) =>{
  Story.find({}, function (err, story) {
    if (err) {
      next(err)
    } else {
      console.log( story );
      const user = req.session.user;
      console.log( user )
      // console.log('user', user);
    res.render('index', {user: user, story: story}); //list of all stories
    }
  })
});


router.get('/new', (req,res,next) => {
  const user = req.session.user;
  const url = `http://api.giphy.com/v1/gifs/random?api_key=${process.env.APIKEY}`
  request.get(url, (err, response, body) => {
    const img_url  = JSON.parse(body).data.image_url;
    console.log('img_url=', JSON.parse(body).data.image_url);
    var game_words = [];
    while(game_words.length < 11) {
      var randomIndex = Math.floor(Math.random() * wordbank.length);
      game_words.push(wordbank[randomIndex]);
    }

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
      words10: game_words[9],
      user: user
    });
  })
});


router.post('/', (req,res,next) => {
  // this is going to go to mongo -- share button

  const email = req.session.user.emails[0].value;
  var img_url = req.body.data.img_url;
  const caption = req.body.data.caption;
  Promise.all([
    Profile.findOne({email: email}).exec(),
    Story.create({
      email: email,
      img_url: img_url,
      caption: caption
    })])
  .then(([profile,story]) => {
    profile.stories.push(story);
    return profile.save();
  })
  .then( () => {
    res.json({user: req.session.user, body: req.body});
  })
  .catch(next)
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
  const user = req.session.user;
  Story.findByIdAndRemove(id, (err, story) => {
    if(err) {
      console.log(err);
    } else {
      console.log('story deleted');
    }
  res.render('index', {user: user, story: story} );
  })
})





module.exports = router;
