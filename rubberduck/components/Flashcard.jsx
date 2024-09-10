import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../theme";
import ReactCardFlip from 'react-card-flip';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function Flashcard({flashcard, side}) {
    const question = side === 'question';
    return (
        <ReactCardFlip isFlipped={!question} style={styles.flashcard} flipDirection="vertical">
            <View style={styles.flashcard}>
                <Text style={styles.qlabel}>QUESTION</Text>
                <View>  
                    <Text style={styles.content}>{flashcard.question}</Text>
                </View>
            </View>
            <View style={styles.flashcard}>
                <Text style={styles.alabel}>ANSWER</Text>
                <View>  
                    <Text style={styles.content}>{flashcard.answer}</Text>
                </View>
            </View>
        </ReactCardFlip>
    );
}

const styles = StyleSheet.create({
    flashcard : {
        backgroundColor: theme.colors.rdmidblue,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: screenHeight * 0.5,
        width: screenWidth * 0.45,
        position: 'relative',
    },
    qlabel: {
        position: 'absolute',
        top: 20,
        left: 20,
        fontSize: 20,
        color: 'white',
    },
    alabel: {
        position: 'absolute',
        top: 20,
        right: 20,
        fontSize: 20,
        color: 'white',
    },
    content : {
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
    }
});