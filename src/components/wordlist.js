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
    fontSize: 20,
    marginVertical: 2,
    marginHorizontal: 5,
    textAlign: 'center',
    color: 'green',
    backgroundColor: 'transparent',
  },
  wordHolder: {
    flex: 1,
  },
});

export default function WordList({store}) {
  book = store.activeBook;
  worddata = book && book.array ? book.array() : [];
  [selectedWord, setselectedWord] = useState('');

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView indicatorStyle="black" style={{flex: 4}}>
          <TouchableWithoutFeedback>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              {worddata.map((word, index) => {
                return (
                  <TouchableOpacity>
                    <View style={{borderRadius: 10, margin: 3}}>
                      <LinearGradient
                        colors={['ivory', 'lightgrey', 'grey']}
                        style={styles.linearGradient}>
                        <Text style={styles.wordText}>{word.name}</Text>

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
        <View style={{flex: 1, borderWidth: 1}} />
      </SafeAreaView>
    </View>
  );
};
