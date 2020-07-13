/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
  Animated,
  TextInput,Dimensions, Keyboard, UIManager
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from "react-native-gesture-handler/Swipeable";
import React, {useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import WordList from './wordlist'; 
import {Constants} from '../constants';


const { State: TextInputState } = TextInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
    backgroundColor: 'transparent',
  },
  bookNameHolder: {
    flex: 1,
  },
  button: {
    flex: 1,
    width: 55,
  },
  iconHolders: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: 'green',
  },
  superIconContainer: {
    position: 'absolute',
    zIndex: 1,
    opacity: 1,
  },
  animContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    height: '100%',
    justifyContent: 'space-around',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  mainIconContainer: {
    position: 'absolute',
  },
  textInput: {
    backgroundColor: 'white',
    height: 40,
  }
});

export default function BookList({store}) {
  bookData = store.books.array();
  //console.log("Book data " + JSON.stringify(store));

  [selectedTabName, setSelectedTabName] = useState(bookData[0].name);
  [bookNameEdit, setbookNameEdit] = useState(false);
  [newBookName, setnewBookName] = useState('');
  [shift, setshift] = useState(new Animated.Value(0));

  useEffect(() => {
    this.keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    this.keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );
 
    return function cleanup() {
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  });



  handleKeyboardDidShow = (event) => {
    const { height: windowHeight } = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;
    const currentlyFocusedField = TextInputState.currentlyFocusedField();
    UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(
        shift,
        {
          toValue: gap,
          duration: 200,
          useNativeDriver: true,
        }
      ).start();
    });
  }

  handleKeyboardDidHide = () => {
    Animated.timing(
      shift,
      {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }
    ).start();
  }


  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.container}
          data={bookData}
          renderItem={({item}) => (
            <View style={{}}>
              <TouchableOpacity style={{flex: 1}}>
                <View style={styles.bookNameHolder}>
                  <LinearGradient
                    colors={['ivory', 'lightgrey', 'grey']}
                    style={styles.linearGradient}>
                    <View style={{flex: 1}}>
                      <Ionicons
                        name={item.icon}
                        size={30}
                        style={{marginRight: 10}}
                        color={
                          selectedTabName === item.name ? 'darkgreen' : 'olive'
                        }
                      />
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={styles.buttonText}>{item.name}</Text>
                    </View>
                    {selectedTabName !== item.name && (
                      <View style={{flex: 1}}>
                        <Ionicons
                          name="chevron-forward-circle-outline"
                          size={30}
                          color={'darkgreen'}
                        />
                      </View>
                    )}
                    {selectedTabName === item.name && (
                      <View style={{flex: 1}} />
                    )}
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              {selectedTabName === item.name && <WordList store={store} />}
            </View>
          )}
          keyExtractor={item => item.name}
        />
      </SafeAreaView>




      <View style={{marginBottom: 5, height: 50}}>


      <LinearGradient
          colors={['ivory', 'lightgrey', 'grey']}
          style={styles.linearGradient}>
          <View style={{flex: 1, alignItems: 'center'}}>

            {!bookNameEdit &&
            <TouchableOpacity
              style={styles.button}
              onPress={() => setbookNameEdit(true)}>
              <View style={styles.iconHolders}>
                <View style={styles.superIconContainer}>
                  <Icon name="plus" size={25} color="darkgreen" />
                </View>
                <View style={styles.mainIconContainer}>
                  <Ionicons name="ios-book" size={40} color="white" />
                </View>
              </View>
            </TouchableOpacity>}

{
    bookNameEdit && 
    <Animated.View style={[styles.animContainer, { transform: [{translateY: shift}] }]}>
<TextInput
          placeholder="Type Book Name!"
          style={styles.textInput}
          autoFocus = {true}
        onSubmitEditing={text => 
          {
            setnewBookName(text);
            setbookNameEdit(false);
        }}

        />
</Animated.View>
  }



      
      

</View>
</LinearGradient>

</View>

    </View>
  );
}
