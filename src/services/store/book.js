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
    if (this.wordList[word.name]) {
      return false; //word already exists
    }
    this.wordList[word.name] = word;
    this.wordArray.push(word);
    return true;
  }
}

module.exports = {
  Book,
};
