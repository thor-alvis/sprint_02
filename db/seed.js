require('./config')
// Require models
const Profile = require('../models/profile');

Profile
.remove({})
.then( () => {
  return Profile.create([
  {
    displayName: 'Brad',
    userName: 'bkmorgan',
    avatar: 'http://placekitten.com/g/200/300',
    stories: 'story'
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
