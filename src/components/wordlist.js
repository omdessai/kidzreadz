import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    FlatList,
    SafeAreaView,
  } from 'react-native';

  import React, {useState} from 'react';

  import { List, ListItem } from 'react-native-elements';


  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

export default function WordList({store}) {
    console.log("Booklist " + JSON.stringify(store));

    var booksData = [];
    Object.keys(store.bookList.bookList).map((key, index) => {
        booksData.push({name:key});
    });

    return (
        <>
        {booksData.length > 0 && <View></View>}
        {booksData.length > 0 && 
    <SafeAreaView style={styles.container}>
      <FlatList
        data={booksData}
        renderItem={({ item }) => (
          <View><Text>{item.name}</Text></View>
          
        )}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
        }
        </>
      );
};
