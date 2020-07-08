/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  SafeAreaView,
} from 'react-native';

import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight:280,
    maxHeight:280
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
      flex:1,
    fontSize: 20,
    textAlign: 'left',
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
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
      
        <FlatList
          style={{flex: 1, padding:20}}
          data={worddata}
          renderItem={({item}) => (
            <View style={{flex: 1, borderWidth:1}}>
              <TouchableOpacity style={{flex: 1}}>
                  <LinearGradient
                    colors={['ivory', 'lightgrey', 'grey']}
                    style={{flex: 1, padding:5}}>
                    <Text >{item.name}</Text>
                    
                  </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.name}
          />
          <View style={{flex: 1, borderWidth:1}}></View>
      </SafeAreaView>
    </View>
  );
};
