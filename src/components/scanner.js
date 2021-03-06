/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import {RNCamera} from 'react-native-camera';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';

repetitionCount = 0;
prevText = '';
textConfirmRepetion = 1; //required to get atleast these repitions to confirm the text
prevDate = Date.now();

const iconProps = {
  superIcon: {
    size: 15,
    color: '#005773',
  },
  mainIcon: {
    size: 30,
    color: 'ivory',
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
  wordRectangleColor: {
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
    width: 55,
  },
  iconHolders: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: 'green',
  },
  unselectedIconHolders: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 40,
    backgroundColor: 'grey',
  },
  superIconContainer: {
    position: 'absolute',
    zIndex: 1,
    opacity: 1,
    marginTop: 20,
    marginLeft: 10,
  },
  mainIconContainer: {
    position: 'absolute',
  },
  scannedText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

function PreviewOff({wordScanClicked}) {
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

function PreviewOn({
  previewStopClicked,
  textSelected,
  calibrationClicked,
  setCalibrationText,
  store,
}) {
  [txtConfirmedState, settxtConfirmedState] = useState(false);
  [confirmedText, setconfirmedText] = useState('');
  [progressRepetionCount, setprogressRepetionCount] = useState(0);
  [firstTextIdentified, setfirstTextIdentified] = useState(false);
  [calibrationMode, setcalibrationMode] = useState(false);

  onTextConfirmed = text => {
    if (text !== prevText) {
      setfirstTextIdentified(false);
      setprogressRepetionCount(0);
      setconfirmedText('');
      prevText = text;
      settxtConfirmedState(false);
      repetitionCount = 0;
      return;
    } else if (confirmedText === text) {
      return;
    }
    setfirstTextIdentified(true);
    repetitionCount++;
    setprogressRepetionCount(repetitionCount / textConfirmRepetion);
    if (repetitionCount < textConfirmRepetion) {
      return;
    }
    settxtConfirmedState(true);
    setconfirmedText(text); //confirmed at least required times
    textSelected(text, false);
  };

  onTextRecognized = blocks => {
    nowDate = Date.now();
    let diff = Date.now() - prevDate;
    if (diff < 1000) {
      //for reading stability only take action for more than 2 seconds
      return;
    }
    prevDate = nowDate;
    if (blocks.textBlocks.length > 0) {
      wordList = [];
      allwords = [];
      blocks.textBlocks.forEach(item => {
        item.components.forEach(component => {
          component.components.forEach(comp => {
            if (comp.type === 'element') {
              item = {
                word: comp.value,
                x: comp.bounds.origin.x,
                y: comp.bounds.origin.y,
                height: comp.bounds.size.height,
                weight: comp.bounds.size.weight,
              };
              if (
                comp.value.length > 5 &&
                !allwords.find(i => i.word === comp.value)
              ) {
                allwords.push(item);
              }
              if (
                item.x > store.preferences.rectOfInterest.xinit &&
                item.x < store.preferences.rectOfInterest.xend &&
                item.y > store.preferences.rectOfInterest.yinit &&
                item.y < store.preferences.rectOfInterest.yend
              ) {
                wordList.push(item);
              }
            }
          });
        });
      });
      setCalibrationText(allwords);
      if (calibrationMode) {
        return;
      }
      wordOfInterest = wordList[0];
      if (wordList.length > 1) {
        tempWord = wordList[0];
        for (idx in wordList) {
          if (idx === 0) {
            continue;
          }
          if (wordList[idx].x > wordOfInterest.x) {
            wordOfInterest = wordList[idx];
          }
          if (wordList[idx].y > wordOfInterest.y) {
            wordOfInterest = wordList[idx];
          }
        }
      }
      if (wordOfInterest) {
        w = wordOfInterest.word.trim();
        tokens = w.split(',');
        if (tokens.length > 1) {
          w = tokens[0];
        }
        tokens = w.split('.');
        if (tokens.length > 1) {
          w = tokens[0];
        }
        //set the selected word here:
        onTextConfirmed(w);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        flashMode={RNCamera.Constants.FlashMode.off}
        onTextRecognized={blocks => {
          this.onTextRecognized(blocks);
        }}
        autoFocus={RNCamera.Constants.AutoFocus.on}>
        {({camera, status, recordAudioPermissionStatus}) => {
          return (
            <View style={{flex: 1}}>
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <View>
                  <View
                    style={{
                      height: 55,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <View>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          previewStopClicked();
                          setfirstTextIdentified(false);
                        }}>
                        <View style={styles.unselectedIconHolders}>
                          <View style={styles.mainIconContainer}>
                            <FeatherIcons
                              name="camera-off"
                              size={iconProps.mainIcon.size}
                              color={'ivory'}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          calibrationClicked(!calibrationMode);
                          setcalibrationMode(!calibrationMode);
                          setfirstTextIdentified(false);
                        }}>
                        <View
                          style={
                            calibrationMode
                              ? styles.iconHolders
                              : styles.unselectedIconHolders
                          }>
                          <View style={styles.mainIconContainer}>
                            <Ionicons
                              name="compass"
                              size={iconProps.mainIcon.size}
                              color={'ivory'}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          setfirstTextIdentified(false);
                        }}>
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
                  <View style={styles.wordRectangleColor} />
                </View>

                {firstTextIdentified && (
                  <View style={{height: 50, margin: 5}}>
                    <View style={{flex: 1, marginBottom: 10}}>
                      <Progress.Bar
                        width={null}
                        borderRadius={30}
                        height={40}
                        progress={progressRepetionCount}
                        color="green"
                      />
                      <View
                        style={{
                          flex: 1,
                          width: '100%',
                          marginTop: 10,
                          zIndex: 1,
                          position: 'absolute',
                          flexDirection: 'row',
                        }}>
                        <View style={{flex: 1, alignItems: 'center'}}>
                          <Text style={styles.scannedText}>
                            {confirmedText}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

export default function Scanner({
  onTextSelected,
  onCalibrationChanged,
  onCalibrationTextChanged,
  store,
}) {
  [previewVisibility, setpreviewVisibility] = useState(false);

  onPreviewToggled = flag => {
    setpreviewVisibility(flag);
  };

  return (
    <>
      {!this.previewVisibility && (
        <PreviewOff
          wordScanClicked={() => {
            setpreviewVisibility(true);
          }}
        />
      )}
      {this.previewVisibility && (
        <PreviewOn
          textSelected={(w, flag) => {
            onTextSelected(w, flag);
          }}
          previewStopClicked={() => {
            setpreviewVisibility(false);
            onCalibrationChanged(false);
          }}
          calibrationClicked={calibrationMode => {
            onCalibrationChanged(calibrationMode);
          }}
          setCalibrationText={text => {
            onCalibrationTextChanged(text);
          }}
          store={store}
        />
      )}
    </>
  );
}
