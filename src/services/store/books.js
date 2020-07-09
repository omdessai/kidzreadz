class Books {
  constructor() {
    this.bookList = {}; //dictionary of books, key => name, item => book object
    this.bookArray = [];
  }

  list() {
    return this.bookList;
  }

  array(){
    return this.bookArray;
  }

  async add(book) {
    console.log("Adding book")
    this.bookList[book.name] = book;
    this.bookArray.push(book);
    console.log(" book added")
  }

  getBook(name){
    return this.bookList[name];
  }
}

module.exports = {
  Books,
};
