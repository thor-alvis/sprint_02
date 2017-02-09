const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  wordBank: String,
  caption: String,
  Date: Date,
  img_url: String,
})

const Story = mongoose.model('Story', StorySchema);
module.exports = Story;
