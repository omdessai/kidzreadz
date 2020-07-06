class Books {
  constructor() {
    this.bookList = {}; //dictionary of books, key => name, item => book object
  }

  async list() {
    return this.bookList;
  }

  async add(book) {
    this.bookList[book.name] = book;
  }

  getBook(name){
    return this.bookList[name];
  }
}

module.exports = {
  Books,
};
