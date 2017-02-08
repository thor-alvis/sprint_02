require('./config')
// Require models
const Profile = require('../models/profile');
const Story = require('../models/story');
const wordBank = require('../models/wordbank')


 // Story
 //  .remove({})
 //  .then( () => {
 //    process.exit();
 //  })

Profile
  .remove({})
  .then( () => {
    var story = new Story({
      wordBank: wordBank,
      caption: 'Uh-Oh SpaghettiOs',
      Date: '02/06/2017',
      img_url: 'http://www.funcage.com/funnypicture.php?image=photos/pics-fbu6b.jpg'
    });
    return story.save();
  })
  .then( (story) => {
    return Profile.create([{
      displayName: 'Brad',
      email: 'bkmorgan',
      avatar: 'http://placekitten.com/g/200/300',
      stories: [story],
      bio: "Hi my name is Brad, I'm here to party"
    }])
  })
  .then( () => {
    return Profile.find({}).populate('stories')
  })
  .then( (profiles) => {
    console.log('hi' ,JSON.stringify(profiles, null, 2));
    console.log(`Seeded ${profiles.length} profiles`);
  })
  .then( () => {
    process.exit();
  })




