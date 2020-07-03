import React, {useState} from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RNTextDetector from 'react-native-text-detector';
import {RNCamera} from 'react-native-camera';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

//oxford dictionary
var od_app_id = "b0f9fd73"
var od_app_key = "2d96750da5f085eeb1c96d6b27e47f08"
var od_url = "https://od-api.oxforddictionaries.com:443/api/v2/entries/";


//merriam-webster dictionary
var mw_appkey = "9c3ac110-450d-4a0b-acd5-5c50301f977f";
var mw_url = "https://dictionaryapi.com/api/v3/references/collegiate/json/";


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
    alignItems:'center'
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
  preview: {
    flex:1,
    margin:5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  rectangleColor: {
    flex:1,
    marginTop:120,
    marginLeft:70,
    position:'absolute',
    height: 50,
    width:200,
    borderRadius:5,
    borderWidth:3,
    margin:10,
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


  getMeaningFromOD = (word_id) =>{
    language = "en-us";
    url = od_url + language + "/" + word_id;
    fetch(url, {
           method: 'GET',
           headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'app_id': od_app_id,
            'app_key':  od_app_key
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          try{
            var meaning = responseJson.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions[0];
           console.log(meaning);
           setMeaning(meaning);
  
          } catch {
  
          }
          
        })
        .catch((error) => {
           console.error(error);
        });
  };

  getMeaningFromMW = (word_id) =>{
    url = mw_url + word_id + "?key=" + mw_appkey;
    console.log(url);
    fetch(url, {
           method: 'GET',
           headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        })
        .then((response) => response.json())
        .then((responseJson) => {
          try{
            //var meaning = responseJson.results[0].lexicalEntries[0].entries[0].senses[0].shortDefinitions[0];
           //console.log();
           setMeaning(responseJson[0].shortdef[0]);
  
          } catch {
  
          }
          
        })
        .catch((error) => {
           console.error(error);
        });
  };

   getMeaning = () => {
    //setMeaning("Retrieving.....");
    wordRepition++;
    if(wordRepition < 5 || prevWord != word){
      console.log(prevWord + " " + wordRepition);
      prevWord = word;
      return;
    }

    wordRepition = 0;
    word_id = word;
    //return;
    return getMeaningFromMW(word_id);
  };

  onTextRecognized = (blocks) => {
    if(blocks.textBlocks.length >0){
      //console.log("blocks identified");
      discovered = "total blocks :"+ blocks.textBlocks.length;
      discovered += "   block sizes: =>"
      wordList = [];
      
      blocks.textBlocks.forEach(item => {
        //discovered += "=>\n"+ JSON.stringify(item.components);
        item.components.forEach(component => {
          component.components.forEach(comp => {
            //discovered += "=>\n"+ JSON.stringify(comp);
            //if(comp.type == "element"){
              //discovered += "\n" + comp.value + " => " + JSON.stringify(comp.bounds.origin);

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
      /*
      for(blks in blocks.textBlocks){
        console.log(blocks.textBlocks[blks]);
        console.log(" =>" )
        //if(blks.value)
          discovered += "  " + blocks.textBlocks[blks].value.length;
      }
      setWords(discovered);
      //console.log(blocks);
      */
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
      
      
      <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          //zoom={.015}
          onTextRecognized = {this.onTextRecognized}
          autoFocus = {RNCamera.Constants.AutoFocus.on}
          
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            //console.log(barcodes);
          }}
        >
          

{({ camera, status, recordAudioPermissionStatus }) => {
  //this.takePicture();
            return (
              
              <View style={styles.preview}>
                  <View style={styles.rectangleColor} >
                  </View>

          </View>
            );
          }}
          </RNCamera>


      </View>

      <View style={styles.textContainer}>
      <Text style={styles.placeHolderText}>Word</Text>
      <Text style={styles.placeHolderText}>{word}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={this.getMeaning}
      >
        <Text>Get Definition</Text>
      </TouchableOpacity>
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