import {RNCamera} from 'react-native-camera';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const mainIconSize = 50;
const superScriptIconSize = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  preview: {
    flex: 1,
    margin: 5,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  rectangleColor: {
    flex: 1,
    marginTop: 120,
    marginLeft: 70,
    position: 'absolute',
    height: 50,
    width: 200,
    borderRadius: 5,
    borderWidth: 3,
    margin: 10,
  },
  buttonContainer:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttons:{
    flex:1
  },
  iconHolders:{
    flex:1,
  }
});

function PreviewOff({titleScanClicked, wordScanClicked}){
  return(
    <View style = {styles.buttonContainer}>
      <TouchableOpacity
            style={styles.button}
            onPress={() => titleScanClicked()}>
              <View style={styles.iconHolders}>
                <View style={{position:'absolute', zIndex: 1,  opacity: 1}}>
                  <Icon name="camera" size={20} color="#005773"/>
                </View>
                <View style={{position:'absolute'}}>
                <Icon name="book" size={50} color="#00B8F3"/>
                </View>
              </View>
              <Text>New Book</Text>

        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => wordScanClicked()}>
              <View>
                <Icon name="camera" />
                <SimpleLineIcons name="book-open" />
                <Text>Word</Text>
              </View>
        </TouchableOpacity>
    </View>
  );
}


function PreviewOn({titleScanClicked, wordScanClicked}){
  onTextRecognized = blocks => {};
  
  onPreviewToggled = flag => {
    setpreviewVisibility(flag);
  };

  return(
    <View>
      <TouchableOpacity
            style={styles.button}
            onPress={() => titleScanClicked()}>
              <View>
                <Icon name="camera" />
                <Icon name="book" />
                <Text>New Book</Text>
              </View>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => wordScanClicked()}>
              <View>
                <Icon name="camera" />
                <SimpleLineIcons name="book-open" />
                <Text>Word</Text>
              </View>
            
        </TouchableOpacity>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          onTextRecognized={this.onTextRecognized}
          autoFocus={RNCamera.Constants.AutoFocus.on}>
          {({camera, status, recordAudioPermissionStatus}) => {
            return (
              <View style={styles.preview}>
                <View style={{width: 20, height: 20}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.onPreviewToggled(false)}>
                    <Text>Off</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.rectangleColor} />
              </View>
            );
          }}
        </RNCamera>
    </View>
  );
}

export default function Scanner(props) {
  [previewVisibility, setpreviewVisibility] = useState(false);
  onTextRecognized = blocks => {};
  
  onPreviewToggled = flag => {
    setpreviewVisibility(flag);
  };

  return (
    <View style={styles.container}>
      {!this.previewVisibility && (
        <PreviewOff></PreviewOff>
      )}
      {this.previewVisibility && (
        <PreviewOn></PreviewOn>
      )}
    </View>
  );
}
