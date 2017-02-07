require('./config')
// Require models
const Profile = require('../models/profile');
const Story = require('../models/story');


Profile
  .remove({})
  .then( () => {
    return Profile.create([
    {
      displayName: 'Brad',
      userName: 'bkmorgan',
      avatar: 'http://placekitten.com/g/200/300',
      stories: [StorySchema],
      bio: "Hi my name is Brad, I'm here to party"
    }
  ])
  .then( () => {
    return Profile.find({})
  })
  .then( (profiles) => {
    console.log(`Seeded ${profiles.length} profiles`);
  })
  .then( () => {
    process.exit()
  })
})

Story
  .remove({})
  .then( () => {
    return Story.create([
    {
      wordBank: [],
      caption: String,
      Date: Date,
      rawImg: String,
      title: String
    }

      ])
    })
  }
