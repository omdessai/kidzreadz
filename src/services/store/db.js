import {openDatabase} from 'react-native-sqlite-storage';
import {Book} from './book';
import {Word} from './word';
import {Books} from './books';

var db = openDatabase({name: 'kidzreadz.sqlite', createFromLocation: 1});

class PersistData {
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
        'INSERT INTO words (word, meaning, audio) VALUES (?, ?, ?)',
        [word.name, word.meaning, word.audio],
        (_tx, results) => {
          console.log('Words Written =>', results.rowsAffected);
          tx.executeSql(
            'INSERT INTO bookwords (book, word) VALUES (?, ?)',
            [book.name, book.name],
            (__tx, _results) => {
              console.log('BookWords writter =>', _results.rowsAffected);
            },
          );
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
          console.log('getBooksAndWords' + res.rows.length);
          for (let i = 0; i < res.rows.length; i++) {
            console.log(res.rows.item(i));
            let book = new Book(res.rows.item(i).book);
            books.addBook(book);
          }
          txn.executeSql(
            'SELECT word, book, definition, audio FROM Bookwords inner join words on bookwords.word = words.word',
            [],
            function(wordtx, wordres) {
              if (wordres.rows.length !== 0) {
                for (let j = 0; j < res.rows.length; ++j) {
                  let word = new Word(
                    wordres.rows.item(j).word,
                    wordres.rows.item(j).meaning,
                    wordres.rows.item(j).audio,
                  );
                  books.getBook(wordres.rows.item(j).book).addWord(word);
                }
              }
              if (cb) cb(books);
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
