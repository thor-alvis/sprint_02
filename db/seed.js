require('./config')
// Require models
const Profile = require('../models/profile');
const Story = require('../models/story');
const wordBank = require('../models/wordbank')

Profile
  .remove({})
  .then( () => {
    var story = new Story({
      wordBank: wordBank,
      caption: 'Uh-Oh SpaghettiOs',
      Date: '02/06/2017',
      rawImage: 'http://www.funcage.com/funnypicture.php?image=photos/pics-fbu6b.jpg',
      title: 'Handling it'
    });
    return story.save();
  })
  .then( (story) => {
    return Profile.create([{
      displayName: 'Brad',
      userName: 'bkmorgan',
      avatar: 'http://placekitten.com/g/200/300',
      stories: [story],
      bio: "Hi my name is Brad, I'm here to party"
    }])
  })
  .then( () => {
    return Profile.find({}).populate('stories')
  })
  .then( (profiles) => {
    console.log(JSON.stringify(profiles, null, 2));
    console.log(`Seeded ${profiles.length} profiles`);
  })
  .then( () => {
    process.exit();
  })
