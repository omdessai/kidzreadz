/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import {RNCamera} from 'react-native-camera';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';

const iconProps = {
  superIcon: {
    size: 20,
    color: '#005773',
  },
  mainIcon: {
    size: 50,
    color: '#00B8F3',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    margin: 5,
    backgroundColor: 'transparent',
  },
  rectangleColor: {
    flex: 1,
    marginTop: 120,
    marginLeft: 70,
    position: 'absolute',
    height: 50,
    width: 200,
    borderRadius: 25,
    borderWidth: 3,
    margin: 10,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  button: {
    flex: 1,
    width: 80,
  },
  iconHolders: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: 'green',
  },
  superIconContainer: {
    position: 'absolute',
    zIndex: 1,
    opacity: 1,
    marginTop: 45,
    marginLeft: 20,
  },
  mainIconContainer: {
    position: 'absolute',
  },
});

function PreviewOff({titleScanClicked, wordScanClicked}) {
  return (
    <View style={{flex: 1}}>
      <View style={{flexGrow: 0.5}} />

      <View style={{flexGrow: 0.4, flex: 1, flexDirection: 'row'}}>
        <View style={{flexGrow: 0.3}} />

        <View style={{flexGrow: 0.7}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, alignItems: 'center', margin: 10}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => titleScanClicked()}>
                <View style={styles.iconHolders}>
                  <View style={styles.superIconContainer}>
                    <Icon
                      name="camera"
                      size={iconProps.superIcon.size}
                      color={iconProps.superIcon.color}
                    />
                  </View>
                  <View style={styles.mainIconContainer}>
                    <Icon
                      name="book"
                      size={iconProps.mainIcon.size}
                      color={iconProps.mainIcon.color}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center', margin: 10}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => wordScanClicked()}>
                <View style={styles.iconHolders}>
                  <View style={styles.superIconContainer}>
                    <Icon
                      name="camera"
                      size={iconProps.superIcon.size}
                      color={iconProps.superIcon.color}
                    />
                  </View>
                  <View style={styles.mainIconContainer}>
                    <Ionicons
                      name="ios-book"
                      size={iconProps.mainIcon.size}
                      color={iconProps.mainIcon.color}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{flexGrow: 0.3}} />
      </View>
      <View style={{flexGrow: 0.5}} />
    </View>
  );
}

function PreviewOn({previewStopClicked}) {
  //onTextRecognized = blocks => {};

  return (
    <View style={{flex: 1}}>
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
            <View>
              <View
                style={{
                  height: 65,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => previewStopClicked()}>
                    <View style={styles.iconHolders}>
                      <View style={styles.mainIconContainer}>
                        <FeatherIcons
                          name="camera-off"
                          size={iconProps.mainIcon.size}
                          color={iconProps.mainIcon.color}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => titleScanClicked()}>
                    <View style={styles.iconHolders}>
                      <View style={styles.superIconContainer}>
                        <Icon
                          name="camera"
                          size={iconProps.superIcon.size}
                          color={iconProps.superIcon.color}
                        />
                      </View>
                      <View style={styles.mainIconContainer}>
                        <Icon
                          name="book"
                          size={iconProps.mainIcon.size}
                          color={iconProps.mainIcon.color}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => titleScanClicked()}>
                    <View style={styles.iconHolders}>
                      <View style={styles.superIconContainer}>
                        <Icon
                          name="camera"
                          size={iconProps.superIcon.size}
                          color={iconProps.superIcon.color}
                        />
                      </View>
                      <View style={styles.mainIconContainer}>
                        <Ionicons
                          name="ios-book"
                          size={iconProps.mainIcon.size}
                          color={iconProps.mainIcon.color}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
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

  onPreviewToggled = flag => {
    setpreviewVisibility(flag);
  };

  return (
    <>
      {!this.previewVisibility && (
        <PreviewOff
          titleScanClicked={() => {
            setpreviewVisibility(true);
          }}
          wordScanClicked={() => {
            setpreviewVisibility(true);
          }}
        />
      )}
      {this.previewVisibility && (
        <PreviewOn
          previewStopClicked={() => {
            setpreviewVisibility(false);
          }}
        />
      )}
    </>
  );
}
