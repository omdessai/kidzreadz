/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';

import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 280,
    maxHeight: 280,
  },
  linearGradient: {
    flexDirection: 'row',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  wordText: {
    fontSize: 18,
    marginVertical: 2,
    marginHorizontal: 5,
    textAlign: 'center',
    color: 'green',
    backgroundColor: 'transparent',
  },
  highlightedWordText: {
    fontSize: 17,
    marginVertical: 2,
    marginHorizontal: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'green',
    backgroundColor: 'transparent',
  },
  meaningWordText: {
    fontSize: 22,
    marginVertical: 2,
    marginHorizontal: 5,
    textAlign: 'left',
    color: 'olive',
    backgroundColor: 'transparent',
  },
  instructionText: {
    fontSize: 20,
    marginVertical: 2,
    marginHorizontal: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'green',
    backgroundColor: 'transparent',
  },
});

export default function WordList({store}) {
  book = store.activeBook;
  worddata = book && book.array ? book.array() : [];
  [selectedWord, setselectedWord] = useState('');
  [meaning, setMeaning] = useState('');

  unselectedGradientColors = ['ivory', 'lightgrey'];
  selectedGradientColors = ['ivory', 'grey'];
  selectedWordName =
    selectedWord && selectedWord.name.length > 0 && selectedWord.name
      ? selectedWord.name
      : '';

  selectWord = word => {
    setMeaning(word.meaning);
    setselectedWord(word);
    if (word.audiourl) {
      sound = new Sound(word.audiourl, null, error => {
        if (error) {
          return;
        }
        sound.play();
      });
    }
  };

  return (
    <View style={styles.container}>
      {worddata.length <= 0 && (
        <View style={{flex: 1, marginTop: 20, backgroundColor: 'lightgrey'}}>
          <Text style={styles.instructionText}>
            Click on the icon above and start scanning words for meaning.
          </Text>
        </View>
      )}
      <SafeAreaView style={{flex: 1}}>
        <ScrollView indicatorStyle="black" style={{flex: 3}}>
          <TouchableWithoutFeedback>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              {worddata.map((word, index) => {
                return (
                  <TouchableOpacity
                    key={Math.random()}
                    onPress={() => {
                      selectWord(word);
                    }}>
                    <View style={{margin: 3}}>
                      <LinearGradient
                        colors={
                          selectedWordName === word.name
                            ? selectedGradientColors
                            : unselectedGradientColors
                        }
                        style={styles.linearGradient}>
                        {selectedWordName === word.name && (
                          <Text style={styles.highlightedWordText}>
                            {word.name}
                          </Text>
                        )}
                        {!(selectedWordName === word.name) && (
                          <Text style={styles.wordText}>{word.name}</Text>
                        )}

                        {word.audiourl && (
                          <Ionicons
                            name="volume-low"
                            size={20}
                            color={'darkgreen'}
                          />
                        )}
                      </LinearGradient>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View
          style={{
            height: 80,
            paddingTop: 20,
            alignItems: 'center',
          }}>
          <Text style={styles.meaningWordText}>{meaning}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
