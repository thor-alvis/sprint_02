const fs = require('fs');

fs.readFile('../public/words.txt', 'utf-8', function(err, data){
  if (err) throw err;
  // console.log(data);
  // turn string into array of names
  var game_words = [];
  var words = data.split('\n');
  // remove the space at the end of the array
  words.pop()
  // random # of 1 to array length
  // random index value
  var word = words[randomIndex];
  while(game_words.length < 21) {
  var randomIndex = Math.floor(Math.random() * words.length);
  game_words.push(words[randomIndex]);
  }
}
console.log(game_words)
