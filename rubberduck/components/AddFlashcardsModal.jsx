import React, {useState, useImperativeHandle, forwardRef} from 'react';
import { Text, Modal } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { screenHeight, screenWidth } from './constants';
import theme from '../theme';

const EditFlashcard = () => {
    return (
        <View style={styles.flashcardContainer}>
            <View style={styles.flashcard}>
                <Text>Front</Text>
            </View>
            <View style={styles.flashcard}>
                <Text>Back</Text>
            </View>
        </View>
    );
}

const AddFlashcardsModal = forwardRef((props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
  
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
  
    useImperativeHandle(ref, () => ({
      showModal,
      hideModal,
    }));
  
    return (
      <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
        <EditFlashcard />
      </Modal>
    );
  });
  
const styles = StyleSheet.create({
    flashcardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flashcard:{
        width: screenWidth * 0.3,
        height: screenHeight * 0.2,
        backgroundColor: theme.colors.rddarkblue,
        margin: screenWidth * 0.05,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10,
    },
    modal: {
        backgroundColor: 'white',
        height: screenHeight * 0.8,
        width: screenWidth * 0.8,
        borderRadius: 20,
        padding: 20,
        margin: 20,
        alignSelf: 'center',
    }
    });
export default AddFlashcardsModal;
