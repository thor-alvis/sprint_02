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


// Story
//   .remove({})
//   .then( () => {
//     return Story.create([
//       {
//       wordBank: wordBank,
//       caption: 'Uh-Oh SpaghettiOs',
//       Date: '02/06/2017',
//       rawImage: 'http://www.funcage.com/funnypicture.php?image=photos/pics-fbu6b.jpg',
//       title: 'Handling it'
//       }
//     ])
//   })
//   .then( () => {
//     return Story.find({})
//   })
//   .then( (stories) => {
//     console.log(`Seeded ${stories.length} stories`);
//   })
//   .then( () => {
//     process.exit();
//   })

// stories1.save();

// var profile1 = new Profile({
//       displayName: 'Brad',
//       userName: 'bkmorgan',
//       avatar: 'http://placekitten.com/g/200/300',
//       stories: [],
//       bio: "Hi my name is Brad, I'm here to party"
// })

// console.log('stories1 ' + stories1)
// profile1.stories.push(stories1);
// console.log('profile ' + profile1)
// profile1.save();

// console.log('stories1 ' + stories1);
// console.log('profile1 ' + profile1);
// console.log('profile1 ' + profile1);
// // console.log('stories caption ' + profile1.stories.caption);
// console.log('caption ' + profile1.stories[0]);




