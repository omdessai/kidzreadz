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
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import {Colors} from 'react-native/Libraries/NewAppScreen';


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: "stretch",
    },
    bookRow: {
      elevation: 1,
      borderRadius: 2,
      backgroundColor: Colors.tertiary,
      flex: 1,
      flexDirection: 'row',  // main axis
      justifyContent: 'flex-start', // main axis
      alignItems: 'center', // cross axis
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 18,
      paddingRight: 16,
      marginLeft: 14,
      marginRight: 14,
      marginTop: 0,
      marginBottom: 6,
    },
    booktitle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
      },
});

export default function WordList({store}) {
    //console.log("Booklist " + JSON.stringify(store));

    var booksData = [];
    Object.keys(store.bookList.bookList).map((key, index) => {
        booksData.push({name:key});
    });

    return (
        <View style={{flex:1,}}>
        {booksData.length > 0 && <View></View>}
        {booksData.length > 0 && 
    <SafeAreaView style={styles.container}>
      <FlatList style={styles.container}
        data={booksData}
        renderItem={({ item }) => (

            <View>
                      <TouchableOpacity
                        style={{flex:1}}
                        onPress={() => {
                          previewStopClicked();
                          setfirstTextIdentified(false);
                        }}>
                        <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between', paddingHorizontal:20}}>
                          <Text style={styles.booktitle}>{item.name}</Text>
                            <Ionicons
                              name="chevron-down-circle-outline"
                              size={20}
                              color={'grey'}
                            />
                        </View>
                      </TouchableOpacity>
                    </View>






        )}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
        }
        </View>
      );
};
