class Book {
  constructor(name, icon = 'book') {
    this.name = name;
    this.icon = icon;
    this.wordList = {};
  }

  words() {
    return this.wordList;
  }

  addWord(word) {
    this.wordList[word.name] = word;
  }
}

module.exports = {
  Book,
};
