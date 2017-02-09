const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
  displayName: String,
  email: String, //gmail acc
  avatar: String, //image url
  stories: [{type: Schema.Types.ObjectId, ref: 'Story'}],
  bio: String
})

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = Profile;
