import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Scanner from './components/scanner';
import BookList from './components/booklist';
import WordList from './components/wordlist'; 

import  {Books} from './services/store/books';
import {Book} from './services/store/book';
import  {Word} from './services/store/word';
import globalHook from 'use-global-hook';
 
import  {Webster} from './services/dictionaries/webster';
import Sound from 'react-native-sound';

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


let bk = new Book("My Word List", 'list');
/*
bk.addWord(new Word('little', 'less', ));
bk.addWord(new Word('Procrastination', 'more', 'b.mp3'));
bk.addWord(new Word('mid', 'medium', 'c.mp3'));
bk.addWord(new Word('Delved', 'less', 'a.mp3'));
bk.addWord(new Word('Indefatigable', 'more', 'b.mp3'));
bk.addWord(new Word('mid', 'medium', 'c.mp3'));
bk.addWord(new Word('little1', 'less', 'a.mp3'));
bk.addWord(new Word('Procrastination1', 'more', 'b.mp3'));
bk.addWord(new Word('mid1', 'medium', 'c.mp3'));
bk.addWord(new Word('Delved1', 'less', 'a.mp3'));
bk.addWord(new Word('Indefatigable1', 'more', 'b.mp3'));
bk.addWord(new Word('mid1', 'medium'));
*/

let books = new Books();
books.add(bk);

const initialState = {
  bookList: books,
  activeBook: bk,
};
 
const actions = {
  addBook: (store, book) => {
    const bookList = store.state.bookList;
    bookList.add(book);
    store.setState({bookList: bookList, activeBook: store.state.activeBook});
  },

  addWord: (store, word) => {
    const bookList = store.state.bookList;
    let bookFromList = bookList.getBook(store.state.activeBook.name);
    if (bookFromList && bookFromList.addWord) {
      bookFromList.addWord(word);
      store.setState({bookList: bookList, activeBook: bookFromList});
    }
  }
};

bookCount = 0;
function addFakeBook(actions){
  setTimeout(() => {
    //console.log("interval" + bookCount)
    if(bookCount > 2) return;
    addFakeBook(actions);
    bookCount++;
    
    actions.addBook(new Book("My Book" + bookCount));
  }, 3000);
};
 

const useGlobal = globalHook(React, initialState, actions);

const App: () => React$Node = () => {
  const [globalState, globalActions] = useGlobal();


  //addFakeBook(globalActions);
  
  wordDiscovered = async (text) =>  {
    
    webster = new Webster();
                 definition = await webster.lookup(text);
                 console.log(JSON.stringify(definition));


                audiourl = 'https://media.merriam-webster.com/audio/prons/en/us/mp3/l/limit001.mp3';
                





      // Load the sound file
      const music = new Sound(audiourl, null, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully, play			
        music.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      });

/*
                 sound = new Sound(definition.audio, null, (error) => {
                  if (error) {
                    // do something
                    console.log(error);
                  }
                  console.log("playing "+ definition.audio);
                  // play when loaded
                  sound.play();
                });
*/
                globalActions.addWord(new Word(text, definition.meaning, definition.audio));

                 
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KidzReadz</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.previewContainer}>
          
        <Scanner
            onTextSelected={(text, isTitle) => {
              console.log("discovered text "+ text)
              if (isTitle) {
                globalActions.addBook(new Book(text));
              } else {
 
                wordDiscovered(text);

              }
            }}
          />
          
        </View>
        <View style={styles.wordListContainer} >
            {/*<Text>{meaning}</Text>*/}
            <BookList store={globalState}></BookList>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>ZeroGravity Kidz</Text>
      </View>
    </View>
  );
};

export default App;
