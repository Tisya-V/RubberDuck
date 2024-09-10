import React, {useState, useImperativeHandle, forwardRef} from 'react';
import { Text, Modal } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { screenHeight, screenWidth } from './constants';


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
        <Text>ExampleModalText</Text>
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
    }
    });
export default AddFlashcardsModal;
