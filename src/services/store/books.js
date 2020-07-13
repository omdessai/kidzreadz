import {Constants} from '../../constants';

class Books {
  constructor() {
    this.bookList = {}; //dictionary of books, key => name, item => book object
    this.bookArray = [];
  }

  list() {
    return this.bookList;
  }

  array() {
    return this.bookArray;
  }

  async add(book) {
    if (this.bookList[book.name]) {
      return false;
    }

    this.bookList[book.name] = book;

    if (book.name === Constants.DefaultBook.name) {
      book.icon = Constants.DefaultBook.icon;
      this.bookArray.unshift(book);
    } else {
      this.bookArray.push(book);
    }
    return true;
  }

  getBook(name) {
    if (!name || name === null) {
      return this.bookArray[0];
    }
    return this.bookList[name];
  }
}

module.exports = {
  Books,
};
