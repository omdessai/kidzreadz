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
    height:280,
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
    //worddata = book && book.array ? book.array():[];
    worddata =  [{"name":"little","meaning":"less","audiourl":"a.mp3"},
    {"name":"big","meaning":"more","audiourl":"b.mp3"},
    {"name":"mid","meaning":"medium","audiourl":"c.mp3"},
    {"name":"little1","meaning":"less","audiourl":"a.mp3"},
    {"name":"big1","meaning":"more","audiourl":"b.mp3"},
    {"name":"mid1","meaning":"medium","audiourl":"c.mp3"}];
    console.log(JSON.stringify(worddata));
  [selectedWord, setselectedWord] = useState('');

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.container}
          data={worddata}
          renderItem={({item}) => (
            <View style={{}}>
              <TouchableOpacity style={{flex: 1}}>
                <View style={styles.wordHolder}>
                  <LinearGradient
                    colors={['ivory', 'lightgrey', 'grey']}
                    style={styles.linearGradient}>
                        {console.log(item.name)}
                    <Text style={styles.wordText}>{item.name}</Text>
                    
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.name}
        />
      </SafeAreaView>
    </View>
  );
};
