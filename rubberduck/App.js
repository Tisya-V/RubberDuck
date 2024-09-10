import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { Appbar, Button, Icon, PaperProvider, TextInput, Tooltip, Portal, Modal } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './theme';
import Flashcard from './components/Flashcard';
import DuckChat from './components/DuckChat';
import AddFlashcardsModal from './components/AddFlashcardsModal';
import { sendAnswer } from './controller/controller.mjs';
import { screenHeight, screenWidth } from './components/constants';

export default function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [flashcard, setFlashcard] = useState({question:'What is a CPU? What is the purpose of a CPU?', answer:'The CPU is the central processing unit of a computer, and its purpose is to execute instructions and process data.'});
  const [flashcardSide, setFlashcardSide] = useState('question');
  const modalRef = useRef();

  const userAnswer = (flashcard, answer) => {
    setInput('');
    const newChat = [...chat, { role: 'user', content: answer }];
    setChat(newChat);
    sendAnswer(flashcard.question, flashcard.answer, answer)
      .then(response => {
        console.log(response);
        if (response.responseType === 'hint') {
          setChat([...newChat, { role: 'assistant', content: response.response }]);
        } else {
          // TODO - flip card
          flipFlashcard();
          setChat([...newChat, { role: 'assistant', content: response.response }]);
        }
      })
      .catch(error => console.error(error));
  };

  const flipFlashcard = () => {
    if (flashcardSide === 'question') {
      setFlashcardSide('answer');
      setButtonDisabled(false);
    } else {
      setFlashcardSide('question');
    }
  };
  
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Portal>
          <AddFlashcardsModal ref={modalRef}></AddFlashcardsModal>
        </Portal>

        <View style={styles.container}>
          <Appbar.Header style={styles.appbar}>
            <Image source={require('./assets/icon.png')} 
                   style={{ width: 70, height:70 }} 
            />
            <Appbar.Content title="rubberduck" />

            <Button 
              style={[styles.button, {backgroundColor: theme.colors.rddarkblue}] }
              textColor='white'
              icon="plus" 
              onPress={() => modalRef.current.showModal()}
            >New Deck</Button>
            
          </Appbar.Header>
          <View>

            <View style={styles.cardContainer}>
              <Flashcard flashcard={flashcard} side={flashcardSide}></Flashcard>
              <DuckChat chat= {chat}></DuckChat>
            </View>

            <View style={styles.inputContainer}>
              <TextInput style={styles.textinput}
                placeholder= 'Start typing your answer here...'
                activeOutlineColor={theme.colors.rddarkblue}
                mode= 'outlined'
                value={input}
                onChangeText={text => setInput(text)}
                onKeyPress={(e) => {e.key === 'Enter' ? 
                  input.trim().length > 0 ? userAnswer(flashcard, input): null
                   : 
                  null
              }}
              ></TextInput>

              <Tooltip
                visible={tooltipVisible}
                title="Give the question a try first! Your rubber duck will give you a helpful hint if you get stuck."
              >
              <Button 
                style={styles.button}
                mode="contained" 
                onMouseEnter={
                  () => {
                    if (buttonDisabled) {
                      setTooltipVisible(true);
                    }
                  }
                }
                onMouseLeave={ 
                  () => {
                    if (buttonDisabled) {
                      setTooltipVisible(false);
                    }
                  }
                }
                onPress={() => {
                  setButtonDisabled(true);
                  // TODO - next card
                }}
                disabled={buttonDisabled}
                buttonColor={buttonDisabled ? theme.colors.rdgrey : theme.colors.rddarkblue}
              >Next Flashcard</Button>
              </Tooltip>

            </View>
            
            <StatusBar style="auto" />
          </View>
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar: {
    marginHorizontal: screenWidth * 0.05,
    height: screenHeight * 0.2, 
    backgroundColor: theme.colors.rdlightblue,
  },
  
  cardContainer: {
    flexDirection:'row', 
    marginHorizontal:screenWidth * 0.05,
    marginVertical:screenHeight * 0.05,
  },
  inputContainer: { 
    flexDirection:'row', 
    justifyContent:'space-between',
    marginHorizontal: screenWidth * 0.05,
  },
  textinput : {
    borderRadius: 10,
    width: screenWidth * 0.7,
    backgroundColor: theme.colors.rdgrey,
  },
  button : {
    borderRadius: 10,
    width: screenWidth * 0.15,
    justifyContent: 'center',
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