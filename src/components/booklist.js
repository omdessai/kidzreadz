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

import WordList from './wordlist'; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
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
});

export default function BookList({store}) {
  bookData = store.bookList.array();

  [selectedTabName, setSelectedTabName] = useState(bookData[0].name);

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
                    <Ionicons
                      name={item.icon}
                      size={30}
                      style={{marginRight: 10}}
                      color={
                        selectedTabName === item.name ? 'darkgreen' : 'olive'
                      }
                    />
                    <Text style={styles.buttonText}>{item.name}</Text>
                    {selectedTabName !== item.name && (
                      <Ionicons
                        name="chevron-forward-circle-outline"
                        size={30}
                        color={'darkgreen'}
                      />
                    )}
                    {selectedTabName === item.name && (
                      <Ionicons
                        name="chevron-down-circle"
                        size={30}
                        color={'darkgreen'}
                      />
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
    </View>
  );
}
