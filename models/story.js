const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  wordBank: [String],
  caption: String,
  Date: Date,
  rawImage: String,
  title: String
})

const Story = mongoose.model('Story', StorySchema);
module.exports = Story;
