import {Book} from './book'

class Books {
  constructor() {
    let bk = new Book('My Word List', 'list');
    this.bookList = {}; //dictionary of books, key => name, item => book object
    this.bookArray = [];
    this.add(bk);
  }

  list() {
    return this.bookList;
  }

  array(){
    return this.bookArray;
  }

  async add(book) {
    this.bookList[book.name] = book;
    this.bookArray.push(book);
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
