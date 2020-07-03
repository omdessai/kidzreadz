import React, {useState} from 'react';
import {StyleSheet, View, Button, Text, Dimensions, TouchableOpacity} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  Me:{
    flex:1,
    backgroundColor: 'green',
  },
  header: {
    backgroundColor: 'red',
    flex:1,
    margin:10,
    alignItems:'center',
    justifyContent:'center',
    borderTopLeftRadius:50,
    borderTopRightRadius:50
  },
  footer:{
    backgroundColor: 'white',
    flex:1,
    margin:10,
    alignItems:'center',
    justifyContent:'center',
    borderBottomEndRadius:50,
    borderBottomStartRadius:50
  },
  body:{
    backgroundColor: 'yellow',
    flex:8,
    borderRadius:50,
    margin:10,
  },
  title:{
    fontSize: 35,
  },
  buttonContainer:{
    backgroundColor: 'green',
    flex:1,
    borderRadius:50,
    margin:10,
  },
  hi:{
    flex:1,
  }
})

const App: () => React$Node = () => {

  return(
    <View style={styles.Me}>
        <View style={styles.header}>
          <Text style={styles.title}>Calculator</Text>
        </View>
        <View style={styles.body}>
        <View style={styles.buttonContainer}>
          <Text>alignItems</Text>
        </View>

        <View style={styles.buttonContainer}>
        <Button title = '0' style={styles.hi}></Button>
        </View>

        <View style={styles.buttonContainer}>
        </View>

        <View style={styles.buttonContainer}>
        </View>

        <View style={styles.buttonContainer}>
        </View>

        <View style={styles.buttonContainer}>
        </View>


        </View>
        <View style={styles.footer}>
          <Text>App by Om Dessai</Text>
        </View>
    </View>
  );
};
export default App;