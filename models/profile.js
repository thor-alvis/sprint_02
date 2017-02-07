const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  displayName: String,
  userName: String, //gmail acc
  avatar: String, //image url
  stories: String,
  bio: String
})

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
