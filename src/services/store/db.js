import {openDatabase} from 'react-native-sqlite-storage';
import {Book} from './book';
import {Word} from './word';
import {Books} from './books';
import {Constants} from '../../constants';

function errorCB(err) {
  console.log('SQL Error: ' + err);
}

function okCB() {
  //console.log('SQL success');
}

var db = openDatabase(
  {name: 'kr_v2.sqlite', createFromLocation: 1},
  okCB,
  errorCB,
);

class PersistData {
  constructor() {
    db.transaction(function(txn) {
      txn.executeSql('SELECT * FROM books', [], function(tx, res) {
        if (res.rows.length === 0) {
          //create default book
          txn.executeSql(
            'INSERT INTO books (book) VALUES (?)',
            [Constants.DefaultBook.name],
            (_tx, results) => {},
          );
        }
      });
    });
  }

  async deleteWord(book, word) {
    db.transaction(function(tx) {
      tx.executeSql(
        'DELETE from bookwords where book =? and word =?',
        [book.name, word.name],
        (_tx, results) => {
          //console.log('BookWords Deleted written =>', results.rowsAffected);
          tx.executeSql(
            'DELETE from words where word =?',
            [word.name],
            (__tx, res1) => {
              console.log('words Deleted written =>', res1.rowsAffected);
            },
          );
        },
      );
    });
  }

  async deleteBook(book) {
    db.transaction(function(tx) {
      tx.executeSql(
        'DELETE from words where word in (select word from bookwords where book=?)',
        [book.name],
        (_tx, results) => {
          console.log('BookWords Deleted for book  =>', results.rowsAffected);
          tx.executeSql(
            'DELETE from books where book =?',
            [book.name],
            (__tx, res) => {
              console.log('Book Deleted =>', res.rowsAffected);
            },
          );
        },
      );
    });
  }

  async cleanDb() {
    //return; //This is only for testing.
    db.transaction(function(tx) {
      tx.executeSql('DELETE from bookwords', [], (_tx, results) => {
        console.log('BookWords Deleted written =>', results.rowsAffected);

        tx.executeSql('DELETE from words', [], (__tx, res1) => {
          console.log('words Deleted written =>', res1.rowsAffected);

          tx.executeSql('DELETE from books', [], (___tx, res2) => {
            console.log('books Deleted written =>', res2.rowsAffected);
          });
        });
      });
    });
  }

  async addBook(book) {
    db.transaction(function(tx) {
      tx.executeSql(
        'INSERT INTO books (book) VALUES (?)',
        [book.name],
        (_tx, results) => {
          //console.log('Books written =>', results.rowsAffected);
        },
      );
    });
  }

  async addWord(word, book) {
    //console.log('adding word to db '+ JSON.stringify(word) + ' ' + JSON.stringify(book));
    db.transaction(function(tx) {
      tx.executeSql(
        'INSERT INTO words (word, definition, audio) VALUES (?, ?, ?)',
        [word.name, word.meaning, word.audiourl],
        (_tx, results) => {
          //console.log('Words Written =>', results.rowsAffected);
          tx.executeSql(
            'INSERT INTO bookwords (book, word) VALUES (?, ?)',
            [book.name, word.name],
            (__tx, _results) => {
              //console.log('BookWords written =>', _results.rowsAffected);
            },
          );
        },
        function(error) {
          console.log('Error ' + JSON.stringify(error));
        },
      );
    });
  }

  async addPreferences(key, settingsObj) {
    db.transaction(function(tx) {
      tx.executeSql(
        'DELETE FROM preferences where key =?',
        [key],
        (_tx, results) => {
          tx.executeSql(
            'INSERT INTO preferences (key, value) VALUES (?, ?)',
            [key, JSON.stringify(settingsObj)],
            (__tx, _results) => {
              //console.log('Preferences Written =>', _results.rowsAffected);
            },
          );
        },
      );
    });
  }

  async getPreferences(cb) {
    var preferences = {};
    db.transaction(function(txn) {
      txn.executeSql('SELECT key, value FROM preferences', [], function(
        tx,
        res,
      ) {
        if (res.rows.length !== 0) {
          for (let j = 0; j < res.rows.length; ++j) {
            preferences[res.rows.item(j).key] = JSON.parse(
              res.rows.item(j).value,
            );
          }
        }
        cb(preferences);
      });
    });
  }

  async getBooksAndWords(cb) {
    var books = new Books();
    db.transaction(function(txn) {
      txn.executeSql('SELECT * FROM books', [], function(tx, res) {
        if (res.rows.length !== 0) {
          for (let i = 0; i < res.rows.length; i++) {
            let book = new Book(res.rows.item(i).book);
            books.add(book);
          }
          txn.executeSql(
            'SELECT * FROM words LEFT OUTER join bookwords on bookwords.word = words.word',
            [],
            function(wordtx, wordres) {
              //console.log('read words ' + wordres.rows.length);
              if (wordres.rows.length !== 0) {
                for (let j = 0; j < wordres.rows.length; ++j) {
                  //console.log(wordres.rows.item(j));
                  let word = new Word(
                    wordres.rows.item(j).word,
                    wordres.rows.item(j).definition,
                    wordres.rows.item(j).audio,
                  );
                  //console.log(JSON.stringify(word));
                  books.getBook(wordres.rows.item(j).book).addWord(word);
                }
              }
              cb(books); //no words
            },
            function(wordTx, error) {
              console.log('Error ' + error);
              cb(books);
            },
          );
        }
        cb(books); //no books
      });
    });
  }
}

module.exports = {
  PersistData,
};
