import {openDatabase} from 'react-native-sqlite-storage';
import {Book} from './book';
import {Word} from './word';
import {Books} from './books';

function errorCB(err) {
  console.log('SQL Error: ' + err);
}

function okCB() {
  console.log('SQL success');
}

var db = openDatabase(
  {name: 'kr_1.sqlite', createFromLocation: 1},
  okCB,
  errorCB,
);

class PersistData {
  async cleanDb() {
    return; //This is only for testing.
    db.transaction(function(tx) {
      tx.executeSql('DELETE from bookwords', [], (_tx, results) => {
        console.log('BookWords Deleted written =>', results.rowsAffected);

        tx.executeSql('DELETE from words', [], (__tx, results) => {
          console.log('words Deleted written =>', results.rowsAffected);

          tx.executeSql('DELETE from books', [], (__tx, results) => {
            console.log('books Deleted written =>', results.rowsAffected);
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
          console.log('Books written =>', results.rowsAffected);
        },
      );
    });
  }

  async addWord(word, book) {
    db.transaction(function(tx) {
      tx.executeSql(
        'INSERT INTO words (word, definition, audio) VALUES (?, ?, ?)',
        [word.name, word.meaning, word.audiourl],
        (_tx, results) => {
          console.log('Words Written =>', results.rowsAffected);
          tx.executeSql(
            'INSERT INTO bookwords (book, word) VALUES (?, ?)',
            [book.name, word.name],
            (__tx, _results) => {
              console.log('BookWords written =>', _results.rowsAffected);
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
              console.log('Preferences Written =>', _results.rowsAffected);
            },
          );
        },
      );
    });
  }

  async getPreferences(cb) {
    var preferences = [];
    db.transaction(function(txn) {
      txn.executeSql('SELECT key, value FROM preferences', [], function(
        tx,
        res,
      ) {
        if (res.rows.length !== 0) {
          for (let j = 0; j < res.rows.length; ++j) {
            preferences.push({
              key: res.rows.item(j).KEY,
              value: res.rows.item(j).VALUE,
            });
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
              console.log('read words ' + wordres.rows.length);
              if (wordres.rows.length !== 0) {
                for (let j = 0; j < res.rows.length; ++j) {
                  console.log(wordres.rows.item(j));
                  let word = new Word(
                    wordres.rows.item(j).word,
                    wordres.rows.item(j).definition,
                    wordres.rows.item(j).audio,
                  );
                  console.log(JSON.stringify(word));
                  books.getBook(wordres.rows.item(j).book).addWord(word);
                }
              }
              cb(books);
            },
            function(wordTx, error) {
              console.log('Error ' + error);
              cb(books);
            },
          );
        }
      });
    });
  }
}

module.exports = {
  PersistData,
};
