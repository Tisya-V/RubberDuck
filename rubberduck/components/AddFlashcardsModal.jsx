import React, {useState, useImperativeHandle, forwardRef} from 'react';
import { Appbar, Button, Modal, TextInput, Divider, IconButton, HelperText } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { screenHeight, screenWidth, flashcardDir } from './constants';
import theme from '../theme';
import { parseFlashcards } from '../model/fc-txt-parser';
import { setNewDeck } from '../model/currentDeck';
import * as FileSystem from 'expo-file-system';
import { saveAs } from 'file-saver';

const AddFlashcardsModal = forwardRef(({onDeckChange}, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [flashcards, setFlashcards] = useState([
        {question: '', answer: ''}, 
        {question: '', answer: ''}, 
        {question: '', answer: ''}, 
    ]);
    const [deckName, setDeckName] = useState('');
    const [deckNameUnique, setDeckNameUnique] = useState(true);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
  
    useImperativeHandle(ref, () => ({
      showModal,
      hideModal,
    }));

    // const checkDeckNameUniqueness = async (name) => {
    //   try {
    //     const files = await FileSystem.readDirectoryAsync(flashcardDir);
    //     console.log('Files in directory:', files);
    //     if (files.includes(name + '.txt')) {
    //       setDeckNameUnique(false);
    //     } else {
    //       setDeckNameUnique(true);
    //     }
    //   } catch (err) {
    //     console.error('Error reading directory:', err);
    //   }
    // };
  
    const writeNewDeck = async (deckName, flashcards) => {
      try {
        const content = flashcards.map((flashcard) => "\r\n\r\nQuestion:\r\n" + flashcard.front + '\r\nAnswer:\r\n' + flashcard.back).join('')
        const blob = new Blob([content], {type: 'text/plain'});
        saveAs(blob, deckName + '.txt');  
      } catch (err) {
        console.error('Error writing file:', err);
      }
    };


    const renderFlashcards = () => {
        return flashcards.map((flashcard, cardNo) => {
            return (
              <>
              <View key={cardNo} style={styles.flashcardWrapper}>
                  <TextInput
                      mode='outlined'
                      label='Front'
                      dense={true}
                      multiline={true}
                      style={styles.flashcard}
                      outlineColor={theme.colors.rddarkblue}
                      outlineStyle={styles.flashcardOutline}
                      value={flashcard.question}
                      onChangeText={(text) => {
                          setFlashcards((prevFlashcards) =>
                            prevFlashcards.map((flashcard, index) => {
                              if (index === cardNo) {
                                return { question: text, answer: flashcard.answer };
                              } else {
                                return flashcard;
                              }
                            })
                          );
                      }}
                      ></TextInput>
                  <TextInput
                      mode='outlined'
                      label='Back'
                      multiline={true}
                      style={styles.flashcard}
                      outlineColor={theme.colors.rddarkblue}
                      outlineStyle={styles.flashcardOutline}
                      value={flashcard.answer}
                      onChangeText={(text) => {
                          setFlashcards((prevFlashcards) =>
                            prevFlashcards.map((flashcard, index) => {
                              if (index === cardNo) {
                                return { question: flashcard.question, answer: text };
                              } else {
                                return flashcard;
                              }
                            })
                          );
                        }}
                  ></TextInput>
              </View> 
                  <Divider style={{width: screenWidth * 0.6, margin:5 }}></Divider>
              </>
              );
              
    });
    }
  
    return (
      <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
            <Appbar.Header style={styles.appbar}>
            <TextInput
              mode="flat"
              placeholder='✏️ Edit Deck Name'
              value={deckName}
              onChangeText={setDeckName}
              style={styles.titleInput}
              error={!deckName || !deckNameUnique}
            />
            <HelperText type="error" visible={!deckName}>
              Deck name cannot be empty
            </HelperText>
            <HelperText type="error" visible={!deckNameUnique}>
              Deck name must be unique
            </HelperText>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Button 
              style={[styles.button, {backgroundColor: theme.colors.rddarkblue, marginRight:10}] }
              textColor='white'
              icon="file-download-outline" 
              onPress={async () =>
                {

                  const pickerOpts = {
                    types: [
                        {
                        description: "Text",
                        accept: {
                            "text/*": [".txt"],
                        },
                        },
                    ],
                    excludeAcceptAllOption: true,
                    multiple: false,
                  };

                  // Open file picker and destructure the result the first handle
                  const [fileHandle] = await window.showOpenFilePicker(pickerOpts);
                
                  // get file contents
                  const fileData = await fileHandle.getFile();
                  const newFlashcards = await parseFlashcards(fileData);
                  console.log(newFlashcards);
                  setFlashcards((old) => newFlashcards);
                }
              }
            >Import from file</Button>

            <Button 
              style={[styles.button, {backgroundColor: theme.colors.rddarkyellow}] }
              textColor='white'
              icon="content-save" 
              disabled={!deckName || !deckNameUnique}
              onPress={() => 
                {
                // checkDeckNameUniqueness(deckName);
                  if (deckName && deckNameUnique) {
                    // non-empty and unique deck names
                    writeNewDeck(deckName, flashcards);
                    setNewDeck(deckName, flashcards)
                    onDeckChange();
                    hideModal()
                  }
                }
              }
            >Save Deck</Button>


            </View>
            
          </Appbar.Header>
            <View style={styles.flashcardContainer}>
                <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
                {renderFlashcards()}

                <IconButton 
                  icon='plus'
                  iconColor={theme.colors.rddarkblue}
                  containerColor={theme.colors.rdlightblue} 
                  onPress={() => setFlashcards((prevFlashcards) => [...prevFlashcards, {question: '', answer: ''}])}  
                  ></IconButton>
                </ScrollView>
            </View>
      </Modal>
    );
  });
  
  const styles = StyleSheet.create({
      modal: {
          backgroundColor: 'white',
          height: screenHeight * 0.8,
          width: screenWidth * 0.8,
          borderRadius: 20,
          // padding: 20,
          margin: 20,
          alignSelf: 'center',
          flex: 1,
      },
      appbar: {
        marginHorizontal: screenWidth * 0.05,
        height: screenHeight * 0.2, 
        backgroundColor: theme.colors.rdlightblue,
        borderRadius: 20,
        justifyContent: 'space-between',
      },
      scrollView: {
          alignItems: 'center',
          justifyContent: 'center',
          flexGrow: 1,
      },
      flashcardContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    flashcardWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex: 1,
    },
    flashcardOutline: {
        borderWidth: 5,
        borderColor: theme.colors.rddarkblue,
        borderRadius: 10,
    },
    flashcard:{
        width: screenWidth * 0.3,
        height: screenHeight * 0.2,
        marginHorizontal: screenWidth * 0.05,
        marginVertical: screenHeight * 0.02,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10,
    },
    button : {
      borderRadius: 10,
      width: screenWidth * 0.15,
      justifyContent: 'center',
    },
    });
export default AddFlashcardsModal;
