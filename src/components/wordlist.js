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
import {Colors} from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  booktitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

export default function WordList({store}) {
  //console.log("Booklist " + JSON.stringify(store));

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.container}
          data={store.bookList.array()}
          renderItem={({item}) => (
            <View style={{borderWidth: 1}}>
              <TouchableOpacity style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 20,
                  }}>
                  <Ionicons name={item.icon} size={20} color={'grey'} />

                  <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.linearGradient}>
                    <Text style={styles.buttonText}>{item.name}</Text>
                    <Ionicons
                      name="chevron-down-circle-outline"
                      size={20}
                      color={'grey'}
                    />
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
