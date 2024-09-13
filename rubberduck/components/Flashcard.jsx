import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import theme from "../theme";
import ReactCardFlip from 'react-card-flip';
import { screenHeight, screenWidth } from './constants';

export default function Flashcard({flashcard, side}) {
    const question = side === 'question';
    return (
        <ReactCardFlip isFlipped={!question} style={styles.flashcard} flipDirection="vertical">
            <View style={styles.flashcard}>
                <View style={styles.labelContainer}>
                <Text style={styles.qlabel}>QUESTION</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View>  
                        <Text style={styles.content}>{flashcard.question}</Text>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.flashcard}>
                <View style={styles.labelContainer}>
                <Text style={styles.alabel}>ANSWER</Text>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View>  
                        <Text style={styles.content}>{flashcard.answer}</Text>
                    </View>
                </ScrollView>
            </View>
        </ReactCardFlip>
    );
}

const styles = StyleSheet.create({
    flashcard : {
        backgroundColor: theme.colors.rdmidblue,
        borderRadius: 10,
        padding: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        height: screenHeight * 0.5,
        width: screenWidth * 0.45,
        position: 'relative',
    },
    scrollViewContent: {
        // marginTop: screenHeight * 0.1,
    },
    labelContainer: {
        backgroundColor: theme.colors.rdmidblue,
        height: 70,
        width: screenWidth * 0.45,
        zIndex: 1,
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
        // textAlign: 'center',
        paddingVertical:screenHeight * 0.15,
        fontSize: 40,
    }
});