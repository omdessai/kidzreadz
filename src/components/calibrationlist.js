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
});

export default function CalibrationList({store, activeWindowSelected}) {
  worddata = store.calibrationText;
  [selectedText, setselectedText] = useState('');

  unselectedGradientColors = ['ivory', 'lightgrey'];
  selectedGradientColors = ['ivory', 'grey'];
  selectedWordName =
    selectedText && selectedText.word.length > 0 && selectedText.word
      ? selectedText.word
      : '';

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView indicatorStyle="black" style={{flex: 3}}>
          <TouchableWithoutFeedback>
            <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
              {worddata.map((wordRect, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setselectedText(wordRect);
                      activeWindowSelected(wordRect);
                    }}>
                    <View style={{margin: 3}}>
                      <LinearGradient
                        colors={
                          selectedWordName === wordRect.word
                            ? selectedGradientColors
                            : unselectedGradientColors
                        }
                        style={styles.linearGradient}>
                        {selectedWordName === wordRect.name && (
                          <Text style={styles.highlightedWordText}>
                            {wordRect.word}
                          </Text>
                        )}
                        {!(selectedWordName === wordRect.name) && (
                          <Text style={styles.wordText}>{wordRect.word}</Text>
                        )}
                      </LinearGradient>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
