/* eslint-disable no-undef */
import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Scanner from './components/scanner';
import BookList from './components/booklist';
import CalibrationList from './components/calibrationlist';
import {Book} from './services/store/book';
import {Word} from './services/store/word';
import globalHook from 'use-global-hook';
import {Webster} from './services/dictionaries/webster';
import Sound from 'react-native-sound';
import {PersistData} from './services/store/db';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  header: {
    paddingTop: 20,
  },
  footer: {
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  footerTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  previewContainer: {
    flex: 3,
  },
  wordListContainer: {
    flex: 5,
    backgroundColor: 'lightgrey',
  },
});

rectOfInterest = {xinit: 90, xend: 130, yinit: 90, yend: 140};
const initialState = {
  books: {},
  activeBook: {},
  calibrationText: [],
  preferences: {}, //user preferences
};

const actions = {
  addBook: (store, book) => {
    console.log('addbook');
    const bookList = store.state.bookList;
    bookList.add(book);
    let newObj = {bookList: bookList};
    store.setState({...store.state, ...newObj});
  },

  addWord: (store, word) => {
    console.log('addword');
    const bookList = store.state.bookList;
    let bookFromList = bookList.getBook(store.state.activeBook.name);
    if (bookFromList && bookFromList.addWord) {
      bookFromList.addWord(word);
      let newObj = {bookList: bookList, activeBook: bookFromList};
      store.setState({...store.state, ...newObj});
    }
  },

  addCalibrationList: (store, calibrationList) => {
    //console.log('addCalibrationList');
    let newObj = {calibrationText: calibrationList};
    store.setState({...store.state, ...newObj});
  },

  initDataFromDb: (store, bookList, dbsettings) => {
    if (!dbsettings.rectOfInterest) {
      console.log('initDataFromDb');
      dbsettings.rectOfInterest = rectOfInterest;
    }
    let newState = {
      books: bookList,
      activeBook: bookList.array()[0],
      preferences: dbsettings,
      calibrationText: [],
    };
    store.setState({...store.state, ...newState});
  },

  setCalibrationWindow(store, rectOfInterestWindow) {
    // console.log('Preferences '+ JSON.stringify(store.state.preferences) + ' rectOfInterestWindow ' +
    // JSON.stringify(rectOfInterestWindow));
    store.state.preferences.rectOfInterest =
      rectOfInterestWindow.rectOfInterest;
    // let newPreferencesObj = {...store.state.preferences, ...rectOfInterestWindow};
    store.setState(store.state);
    console.log(
      'After update Preferences ' + JSON.stringify(store.state.preferences),
    );
  },
};

testDb = () => {
  console.log("in test db");
  let test = new PersistData();

  //test.cleanDb();
  //return;

  /*
  test.getPreferences('calibrations', (settings) => {console.log(JSON.stringify(settings));});
  test.addPreferences('calibrations', {x:1, y:1, z:1, w:2});
  test.getPreferences('calibrations', (settings) => {console.log(JSON.stringify(settings));});
*/
  console.log('===> in test db - connected');
  test.getBooksAndWords(() => {
    console.log(JSON.stringify(bks));
  });
  let bk1 = new Book('A1');
  let bk2 = new Book('A2');
  let bk3 = new Book('A3');

  //test.addBook(bk1);
  //test.addBook(bk2);
  //test.addBook(bk3);

  let wd1 = new Word('W1', 'M1', 'a1.mp3');
  let wd2 = new Word('W2', 'M2', 'a2.mp3');
  let wd3 = new Word('W3', 'M3', 'a3.mp3');
  let wd4 = new Word('W4', 'M4', 'a4.mp3');
  let wd5 = new Word('W5', 'M5', 'a5.mp3');

  console.log('adding words');
  //test.addWord(wd1, bk1);
  //test.addWord(wd2, bk1);
  //test.addWord(wd3, bk2);
  //test.addWord(wd4, bk3);
  //test.addWord(wd5, bk3);
  //test.getBooksAndWords(bks, () => {console.log(JSON.stringify(bks))});
};

LoadData = cb => {
  var db = new PersistData();
  db.getPreferences(preferences => {
    db.getBooksAndWords(bks => {
      cb(preferences, bks);
    });
  });
};

const useGlobal = globalHook(React, initialState, actions);

const App: () => React$Node = () => {
  [appDataLoaded, setappDataLoaded] = useState(false);
  [appDataLoading, setappDataLoading] = useState(false);
  [calibMode, setcalibMode] = useState(false);
  const [globalState, globalActions] = useGlobal();

  if (!appDataLoading) {
    setappDataLoading(true);
    (function loadDbData() {
      setTimeout(() => {
        LoadData((preferences, booklist) => {
          globalActions.initDataFromDb(booklist, preferences);
          setappDataLoaded(true);
        });
      }, 0);
    })();
  }

  wordDiscovered = async text => {
    webster = new Webster();
    definition = await webster.lookup(text);

    // Load the sound file
    const music = new Sound(definition.audio, null, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully, play
      music.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });

    globalActions.addWord(new Word(text, definition.meaning, definition.audio));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KidzReadz</Text>
      </View>
      <View style={styles.bodyContainer}>
        {!appDataLoaded && <Text>Loading</Text>}
        {appDataLoaded && (
          <View style={styles.bodyContainer}>
            <View style={styles.previewContainer}>
              <Scanner
                onTextSelected={(text, isTitle) => {
                  console.log('discovered text ' + text);
                  if (isTitle) {
                    globalActions.addBook(new Book(text));
                  } else {
                    wordDiscovered(text);
                  }
                }}
                onCalibrationChanged={mode => {
                  setcalibMode(mode);
                }}
                onCalibrationTextChanged={wordList => {
                  globalActions.addCalibrationList(wordList);
                }}
                store={globalState}
              />
            </View>
            {!calibMode && (
              <View style={styles.wordListContainer}>
                <BookList store={globalState} />
              </View>
            )}
            {calibMode && (
              <View style={styles.wordListContainer}>
                <CalibrationList
                  store={globalState}
                  activeWindowSelected={wordRect => {
                    console.log(JSON.stringify(wordRect));
                    let x = parseInt(wordRect.x);
                    let y = parseInt(wordRect.y);
                    var db = new PersistData();
                    let newRectObj = {
                      rectOfInterest: {
                        xinit: x - 20,
                        xend: x + 20,
                        yinit: y - 10,
                        yend: y + 10,
                      },
                    };
                    db.addPreferences('rectOfInterest', newRectObj);
                    globalActions.setCalibrationWindow(newRectObj);
                  }}
                />
              </View>
            )}
          </View>
        )}
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>ZeroGravity Kidz</Text>
      </View>
    </View>
  );
};

export default App;
