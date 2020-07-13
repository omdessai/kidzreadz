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
} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from "react-native-gesture-handler/Swipeable";
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
});

export default function BookList({store}) {
  bookData = store.books.array();
  //console.log("Book data " + JSON.stringify(store));

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
    </View>
  );
}
