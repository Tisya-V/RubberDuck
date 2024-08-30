import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { Appbar, Button, Icon, PaperProvider, TextInput } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import theme from './theme';
import Flashcard from './components/Flashcard';
import DuckChat from './components/DuckChat';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

export default function App() {
  const [input, setInput] = useState('');
  const [chat, setChat] = useState([
    {role:'user', content:'Process instructions'}, 
    {role:'assistant', content:'Good! Just missing a bit - what does CPU stand for? And what else might it process?'}, 
    {role:'user', content:'Central Processing Unit - for processing data and instructions'}
  ]);
  const [flashcard, setFlashcard] = useState({question:'What is a CPU? What is the purpose of a CPU?', answer:'The CPU is the central processing unit of a computer, and its purpose is to execute instructions and process data.'});
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <View style={styles.container}>
          <Appbar.Header style={styles.appbar}>
            <Image source={require('./assets/icon.png')} 
                   style={{ width: 70, height:70 }} 
            />
            <Appbar.Content title="rubberduck" />

            <Button 
              style={styles.button}
              textColor='white'
              icon="plus" 
              onPress={() => console.log('Pressed')}
            >New Deck</Button>
            
          </Appbar.Header>
          <View>

            <View style={styles.cardContainer}>
              <Flashcard content= {flashcard.question} side={'question'}></Flashcard>
              <DuckChat chat= {chat}></DuckChat>
            </View>

            <View style={styles.inputContainer}>
              <TextInput style={styles.textinput}
                placeholder= 'Start typing your answer here...'
                activeOutlineColor={theme.colors.rddarkblue}
                right = {<TextInput.Icon name="send" onPress={() => console.log('Pressed')} />}
                mode= 'outlined'
                value={input}
                onChangeText={text => setInput(text)}
                onKeyPress={(e) => {e.key === 'Enter' ? console.log('Enter pressed') : null}}
              ></TextInput>

              <Button 
                style={styles.button}
                mode="contained" 
                onPress={() => console.log('Pressed')}
              >Don't Know</Button>
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
    backgroundColor: theme.colors.rddarkblue,
    justifyContent: 'center',
  }
});