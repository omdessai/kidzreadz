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
    paddingTop:20,
    backgroundColor: 'green',
  },
  headerTitle:{
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
  meaningContainer:{
    flex:5,
    flexDirection:'column',
    backgroundColor: '#9fdf9f',
  },
  bottomNav:{
    backgroundColor: 'green',
  },
  bottomNavRow:{
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    margin:10
  },
  companyText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
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


  return(
    <View style={styles.container}>


      <View style={styles.header}>

      <Text style={styles.headerTitle}>KidzReadz</Text>
      </View>


      <View style={styles.bodyContainer}>

      <View style={styles.bodyColumnContainer}>
      <View style={styles.previewContainer}>
      <Scanner onTextSelected = {(text) => {setWord(text);}}></Scanner>
      </View>


      <View style={styles.meaningContainer}>
      <Text style={styles.placeHolderText}></Text>
        <Text style={styles.placeHolderText}>{meaning}</Text>
      </View>

      </View>
        </View>

      <View style={styles.bottomNav}>
      <View style={styles.bottomNavRow}>
      <Text style={styles.companyText}>ZeroGravity Kidz</Text>
        </View>
      </View>

    </View>
  );
};

export default App;