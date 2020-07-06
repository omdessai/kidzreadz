/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import {RNCamera} from 'react-native-camera';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import * as Progress from 'react-native-progress';

repetitionCount = 0;
prevText = '';
textConfirmRepetion = 2; //required to get atleast these repitions to confirm the text

const scanItemTypes = {
  word: 'word',
  title: 'title',
};

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
  titleRectangleColor: {
    flex: 1,
    marginTop: 110,
    marginLeft: 70,
    position: 'absolute',
    height: 100,
    width: 220,
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
    marginTop: 45,
    marginLeft: 20,
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

function PreviewOn({previewStopClicked, setScanItemType, textSelected}) {
  [scanItemType, setscanItemType] = useState(setScanItemType);
  [txtConfirmedState, settxtConfirmedState] = useState(false);
  [confirmedText, setconfirmedText] = useState('');
  [progressRepetionCount, setprogressRepetionCount] = useState(0);

  onTextConfirmed = text => {
    console.log(text + ' ' + prevText + ' ' + repetitionCount);
    if (text !== prevText) {
      setprogressRepetionCount(0);
      setconfirmedText('');
      prevText = text;

      repetitionCount = 0;
      return;
    }
    repetitionCount++;
    setprogressRepetionCount(repetitionCount / textConfirmRepetion);
    if (repetitionCount < textConfirmRepetion) {
      return;
    }
    setconfirmedText(text); //confirmed at least required times
  };

  onTextRecognized = (blocks, scanType) => {
    if (blocks.textBlocks.length > 0) {
      wordList = [];
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
              if (scanType === scanItemTypes.word) {
                if (
                  item.x > 110 &&
                  item.x < 170 &&
                  item.y > 120 &&
                  item.y < 160
                ) {
                  wordList.push(item);
                }
              }
              if (scanType === scanItemTypes.title) {
                if (
                  item.x > 100 &&
                  item.x < 170 &&
                  item.y > 60 &&
                  item.y < 180
                ) {
                  wordList.push(item);
                }
              }
            }
          });
        });
      });
      if (scanType === scanItemTypes.word) {
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
      if (scanType === scanItemTypes.title) {
        wordList.sort((a, b) => {
          return a.y - b.y;
        });
        title = '';
        wordList.forEach(wordItem => {
          title += wordItem.word + ' ';
        });
        onTextConfirmed(title.trim());
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
        flashMode={RNCamera.Constants.FlashMode.off}
        onTextRecognized={blocks => {
          this.onTextRecognized(blocks, this.scanItemType);
        }}
        autoFocus={RNCamera.Constants.AutoFocus.on}>
        {({camera, status, recordAudioPermissionStatus}) => {
          return (
            <View style={{flex: 1}}>
              <View style={{flex: 1, justifyContent: 'space-between'}}>
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
                        <View style={styles.unselectedIconHolders}>
                          <View style={styles.mainIconContainer}>
                            <FeatherIcons
                              name="camera-off"
                              size={iconProps.mainIcon.size}
                              color={'red'}
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>

                    <View>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          setscanItemType(scanItemTypes.title);
                        }}>
                        <View
                          style={
                            scanItemType === scanItemTypes.title
                              ? styles.iconHolders
                              : styles.unselectedIconHolders
                          }>
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
                        onPress={() => {
                          setscanItemType(scanItemTypes.word);
                        }}>
                        <View
                          style={
                            scanItemType === scanItemTypes.word
                              ? styles.iconHolders
                              : styles.unselectedIconHolders
                          }>
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
                  {this.scanItemType === scanItemTypes.word && (
                    <View style={styles.wordRectangleColor} />
                  )}
                  {this.scanItemType === scanItemTypes.title && (
                    <View style={styles.titleRectangleColor} />
                  )}
                </View>

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
                        {scanItemType === scanItemTypes.word && (
                          <Text style={styles.scannedText}>
                            {confirmedText}
                          </Text>
                        )}
                        {scanItemType === scanItemTypes.title && (
                          <TextInput style={styles.scannedText}>
                            {confirmedText}
                          </TextInput>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

export default function Scanner({onTextSelected}) {
  [previewVisibility, setpreviewVisibility] = useState(false);
  [scanItemType, setscanItemType] = useState(scanItemTypes.word);

  onPreviewToggled = flag => {
    setpreviewVisibility(flag);
  };

  return (
    <>
      {this.previewVisibility && (
        <PreviewOff
          titleScanClicked={() => {
            setscanItemType(scanItemTypes.title);
            setpreviewVisibility(true);
          }}
          wordScanClicked={() => {
            setscanItemType(scanItemTypes.word);
            setpreviewVisibility(true);
          }}
        />
      )}
      {!this.previewVisibility && (
        <PreviewOn
          textSelected={w => {
            onTextSelected(w);
          }}
          setScanItemType={scanItemType}
          previewStopClicked={() => {
            setpreviewVisibility(false);
          }}
        />
      )}
    </>
  );
}
