import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Scanner from './components/scanner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  header: {
    paddingTop: 20,
  },
  footer: {
    paddingBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  footerTitle: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
  previewContainer: {
    flex: 3,
  },
  wordListContainer: {
    flex: 5,
    backgroundColor: '#9fdf9f',
  },
  bottomNav: {
    backgroundColor: 'green',
  },
});

const App: () => React$Node = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KidzReadz</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.previewContainer}>
          <Scanner
            onTextSelected={text => {
            }}
          />
        </View>
        <View style={styles.wordListContainer} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>ZeroGravity Kidz</Text>
      </View>
    </View>
  );
};

export default App;
