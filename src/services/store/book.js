class Book {
  constructor(name) {
    this.name = name;
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
