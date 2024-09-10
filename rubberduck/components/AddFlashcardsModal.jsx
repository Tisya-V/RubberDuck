import React, {useState, useImperativeHandle, forwardRef} from 'react';
import { Text, Modal, TextInput, Divider } from 'react-native-paper';
import { ScrollView, StyleSheet, View } from 'react-native';
import { screenHeight, screenWidth } from './constants';
import theme from '../theme';



const AddFlashcardsModal = forwardRef((props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [flashcards, setFlashcards] = useState([
        {front: 'f1', back: 'b1'}, 
        {front: 'f2', back: 'b2'}, 
        {front: 'f2', back: 'b2'}, 
        {front: 'f2', back: 'b2'}, 
        {front: '', back: ''}
    ]);
  
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
  
    useImperativeHandle(ref, () => ({
      showModal,
      hideModal,
    }));

    const EditFlashcard = ({index, frontContent, backContent}) => {
        return (
            <View style={styles.flashcardWrapper}>
                <TextInput
                    mode='outlined'
                    label='Front'
                    multiline={true}
                    style={styles.flashcard}
                    outlineColor={theme.colors.rddarkblue}
                    outlineStyle={styles.flashcardOutline}
                    value={frontContent}
                    onChangeText={(text) => {setFlashcards(flashcards.map((flashcard, index) => {
                        if (index === index) {
                            return {front: text, back: flashcard.back};
                        } else {
                            return flashcard;
                        }
                    }
                    ))}}
                    ></TextInput>
                <TextInput
                    mode='outlined'
                    label='Back'
                    multiline={true}
                    style={styles.flashcard}
                    outlineColor={theme.colors.rddarkblue}
                    outlineStyle={styles.flashcardOutline}
                    value={backContent}
                ></TextInput>
            </View>
        );
    }

    const renderFlashcards = () => {
        return flashcards.map((flashcard, index) => {
            console.log(flashcard.front);
            return <EditFlashcard key={index} index={index} frontContent={flashcard.front} backContent={flashcard.back}></EditFlashcard>
        });
    }
  
    return (
      <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
            <View style={styles.flashcardContainer}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                {renderFlashcards()}
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
          padding: 20,
          margin: 20,
          alignSelf: 'center',
          flex: 1,
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
        padding: 10,
    },
    });
export default AddFlashcardsModal;
