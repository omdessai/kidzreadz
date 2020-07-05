import {RNCamera} from 'react-native-camera';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

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
});

export default function Scanner(props) {

    [previewVisibility, setpreviewVisibility] = useState(false);
  onTextRecognized = blocks => {};
  
  onPreviewToggled = flag => {
      setpreviewVisibility(flag);
  }

  return (
    <View style={styles.container}>
        {!previewVisibility &&
        <View style={{width:20, height: 20}}>
                <TouchableOpacity
                style={styles.button}
                onPress={() => this.onPreviewToggled(true)}
            >
                <Text>On</Text>
            </TouchableOpacity>
        </View>
}
        {previewVisibility &&
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
                <View style={{width:20, height: 20}}><TouchableOpacity
                style={styles.button}
                onPress={() => this.onPreviewToggled(false)}
            >
                <Text>Off</Text>
            </TouchableOpacity></View>
              <View style={styles.rectangleColor} />
            </View>
          );
        }}
      </RNCamera>
}
    </View>
  );
}
