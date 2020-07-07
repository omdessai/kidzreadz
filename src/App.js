import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Scanner from './components/scanner';
import WordList from './components/wordlist';

import  {Books} from './services/store/books';
import book, {Book} from './services/store/book';
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
    backgroundColor: 'grey',
  },
  previewContainer: {
    flex: 3,
  },
  wordListContainer: {
    flex: 5,
    backgroundColor: '#9fdf9f',
  },
});


const initialState = {
  bookList: new Books(),
  activeBook: {},
};
 
const actions = {
  addBook: (store, book) => {
    const bookList = store.state.bookList;
    bookList.add(book);
    store.setState({bookList: bookList, activeBook: book});
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
    console.log("interval" + bookCount)
    if(bookCount > 10) return;
    addFakeBook(actions);
    bookCount++;
    if (bookCount == 1) {actions.addBook(new Book("My Word List", 'list'));}
    else {actions.addBook(new Book("My Book" + bookCount));}
  }, 3000);
};
 

const useGlobal = globalHook(React, initialState, actions);

const App: () => React$Node = () => {
  const [globalState, globalActions] = useGlobal();

  const [meaning, setMeaning] = useState("");

  addFakeBook(globalActions);
  
  definitionDiscovered = async (text) =>  {
    webster = new Webster();
                 definition = await webster.lookup(text);
                  sound = new Sound(definition.audio, null, (error) => {
                    if (error) {
                      // do something
                    }
            
                    // play when loaded
                    sound.play();
                  });
                  setMeaning(definition.meaning);

                 
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KidzReadz</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.previewContainer}>
          {/*
        <Scanner
            onTextSelected={(text, isTitle) => {
              console.log("Is title " + isTitle)
              if (isTitle) {
                globalActions.addBook(new Book(text));
              } else {
                globalActions.addWord(text);
                definitionDiscovered(text);

              }
            }}
          />
          */}
        </View>
        <View style={styles.wordListContainer} >
            {/*<Text>{meaning}</Text>*/}
            <WordList store={globalState} />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>ZeroGravity Kidz</Text>
      </View>
    </View>
  );
};

export default App;
