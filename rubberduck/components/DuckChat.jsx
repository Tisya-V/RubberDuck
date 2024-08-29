import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import theme from "../theme";


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function DuckChat({chat}) {
    console.log(chat);

    const content = chat.length === 0 ?
    <Text>🐤🐤🐤</Text> :
    chat.map((message, index) => (
        <Text style={[styles.message, message.role === 'user' ? styles.yourMessage : styles.assistantMessage]} key={index}>
            {message.content}
        </Text>
    ))
    return (
        <ScrollView>
            <View style={styles.container}>
            {content}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: theme.colors.rddarkblue,
        borderRadius: 10,
        padding: 10,
        height: screenHeight * 0.5,
        width: screenWidth * 0.45,
    },
    message : {
        color: 'black',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        borderRadius: 10,
        maxWidth: screenWidth * 0.3,
        marginVertical: 5,
    },
    yourMessage : {
        backgroundColor: theme.colors.rdlightblue,
        alignSelf: 'flex-end',
    },
    assistantMessage : {
        backgroundColor: theme.colors.rdlightyellow,
        alignSelf: 'flex-start',
    }
});