/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native';

import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight:100,
    maxHeight:100
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    paddingVertical: 2,
    justifyContent: 'space-between',
    borderWidth:1,
  },
  wordText: {
    fontSize: 18,
    marginVertical:2,
    marginHorizontal:5,
    textAlign: 'center',
    color: 'green',
    backgroundColor: 'transparent',
  },
  highlightedWordText: {
    fontSize: 20,
    marginVertical:2,
    marginHorizontal:5,
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
    worddata = book && book.array ? book.array():[];
    
  [selectedWord, setselectedWord] = useState('');

  return (
    <View style={styles.container}>
        <SafeAreaView style={{flex: 3}}>

        <ScrollView indicatorStyle='black' >
            <TouchableWithoutFeedback>
        <View style={{flexWrap:'wrap', flexDirection:'row'}}>
        {worddata.map((word, index) => {
            
            return(
            <View style={{borderWidth:1, borderRadius:10, margin:3}} >
                <Text style={styles.wordText}>{word.name}</Text>
                </View>
                );
        })}
        </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={{flex: 1, borderWidth:1}}></View>
      </SafeAreaView>
    </View>
  );
};
