class Book {
  constructor(name, icon = 'book') {
    this.name = name;
    this.icon = icon;
    this.wordList = {};
    this.wordArray = [];
  }

  words() {
    return this.wordList;
  }

  array(){
    return this.wordArray;
  }

  addWord(word) {
    this.wordList[word.name] = word;
    this.wordArray.push(word);
  }
}

module.exports = {
  Book,
};
