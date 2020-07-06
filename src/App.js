import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Sound from 'react-native-sound';

import {Webster} from './services/dictionaries/webster';
import Scanner from './components/scanner';


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#424242',
  },
  header: {
    paddingTop:20
  },
  headerTitle:{
    backgroundColor: '#424242',
    color:'#fff',
    textAlign:'center',
    padding:10,
    fontSize: 30,
    fontWeight:'bold'
  },
  placeHolderText:{
    color:'#fff',
    textAlign:'center',
    padding:10,
    fontSize: 15,
    fontWeight:'bold'
  },
  bodyContainer:{
    flex:1,
    backgroundColor: 'grey',
  },
  bodyColumnContainer:{
    flex:1,
    flexDirection:'column',
  },
  previewContainer:{
    flex:3,
  },
  textContainer:{
    flex:1,
    flexDirection:'column',
    backgroundColor: 'lightgreen',
  },
  meaningContainer:{
    flex:2,
    flexDirection:'column',
    backgroundColor: 'grey',
  },
  bottomNav:{
    backgroundColor: 'green',
  },
  bottomNavRow:{
    flexDirection: 'row',
    margin:10
  },
  bottomNavButton:{
    flex:1,
    backgroundColor: 'blue',
    borderRadius:5,
    marginHorizontal:20,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#CDDCCC",
    padding: 10
  },
});

wordRepition = 0;
prevWord = "";

const App: () => React$Node = () => {

  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

    getMeaning = async () =>  {
    wordRepition++;
    if(wordRepition < 5 || prevWord != word){
      console.log(prevWord + " " + wordRepition);
      prevWord = word;
      return;
    }

    wordRepition = 0;
    word_id = word;
    dictionary = new Webster();
    a =  await dictionary.lookup(word_id);
      console.log(JSON.stringify(a));

      sound = new Sound(a.audio, null, (error) => {
        if (error) {
          // do something
        }
        
        // play when loaded
        sound.play();
      });

    setMeaning(a.meaning);
    
  };

  onTextRecognized = (blocks) => {
    if(blocks.textBlocks.length >0){
      discovered = "total blocks :"+ blocks.textBlocks.length;
      discovered += "   block sizes: =>"
      wordList = [];
      
      blocks.textBlocks.forEach(item => {
        item.components.forEach(component => {
          component.components.forEach(comp => {

            if(comp.type == "element"){
              item = {word: comp.value, x: comp.bounds.origin.x,
                  y: comp.bounds.origin.y, height: comp.bounds.size.height,
                  weight: comp.bounds.size.weight};
                  if(item.x > 110 && item.x < 170 && item.y > 120 && item.y < 160){
                    wordList.push(item);
                  }
              }
            }
          );
        });
      });
      wordOfInterest = wordList[0];
      console.log(JSON.stringify(wordList));
      if(wordList.length > 1){
        tempWord = wordList[0];
        for(idx in wordList){
          if(idx == 0) continue;
          if(wordList[idx].x > wordOfInterest.x) wordOfInterest = wordList[idx];
          if(wordList[idx].y > wordOfInterest.y) wordOfInterest = wordList[idx];
        }
      }
      if(wordOfInterest){
        w = wordOfInterest.word.trim();
        tokens = w.split(',');
        if(tokens.length > 1){
          w = tokens[0];
        }
        tokens = w.split('.');
        if(tokens.length > 1){
          w = tokens[0];
        }
        setWord(w);
        getMeaning();
      }
    }
  };

  return(
    <View style={styles.container}>


      <View style={styles.header}>

      <Text style={styles.headerTitle}>Header</Text>
      </View>


      <View style={styles.bodyContainer}>

      <View style={styles.bodyColumnContainer}>
      <View style={styles.previewContainer}>
      <Scanner onTextSelected = {(text) => {console.log(text);}}></Scanner>
      </View>

      <View style={styles.textContainer}>
      <Text style={styles.placeHolderText}>Word</Text>
      <Text style={styles.placeHolderText}>{word}</Text>

      </View>

      <View style={styles.meaningContainer}>
      <Text style={styles.placeHolderText}>Definition</Text>
        <Text style={styles.placeHolderText}>{meaning}</Text>
      </View>

      </View>
        </View>

      <View style={styles.bottomNav}>
      <View style={styles.bottomNavRow}>
        <View style={styles.bottomNavButton}>
          <Text style={styles.placeHolderText}>Add Book</Text>
        </View>
        <View style={styles.bottomNavButton}>
        <Text style={styles.placeHolderText}>Add Word</Text>
        </View>
        </View>
      </View>

    </View>
  );
};

export default App;