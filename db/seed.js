require('./config')
// Require models
const Profile = require('../models/profile');
const Story = require('../models/story');
const wordBank = require('../models/wordbank')

Story
  .remove({})
  .then( () => {
    return Story.create([
      {
      wordBank: ['you', 'together', 'beauty', 'bed', 'lazy'],
      caption: 'Uh-Oh SpaghettiOs',
      Date: '02/06/2017',
      rawImage: 'http://www.funcage.com/funnypicture.php?image=photos/pics-fbu6b.jpg',
      title: 'Handling it'
      }
    ])
  })
  .then( () => {
    return Story.find({})
  })
  .then( (stories) => {
    console.log(`Seeded ${stories.length} stories`);
  })
  .then( () => {
    process.exit();
  })

Profile
  .remove({})
  .then( () => {
    return Profile.create([
      {
      displayName: 'Brad',
      userName: 'bkmorgan',
      avatar: 'http://placekitten.com/g/200/300',
      stories: 'insert stories--here',
      bio: "Hi my name is Brad, I'm here to party"
      }
    ])
  })
  .then( () => {
    return Profile.find({})
  })
  .then( (profiles) => {
    console.log(`Seeded ${profiles.length} profiles`);
  })
  .then( () => {
    process.exit();
  })


