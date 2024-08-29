import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../theme";


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function Flashcard({content, side}) {
    const question = side === 'question';
    return (
        <View style={styles.flashcard}>
            <Text style={question ? styles.qlabel : styles.alabel}>
                {question ? "QUESTION" : "ANSWER"}
            </Text>
            <View>  
                <Text style={styles.content}>{content}</Text>
            </View>
        </View>
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