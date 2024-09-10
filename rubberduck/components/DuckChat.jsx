import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView , Image} from "react-native";
import theme from "../theme";


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function DuckChat({chat}) {
    const content = chat.length === 0 ?
    <Text>🐤🐤🐤</Text> :
    chat.map((message, index) => (
        message.role === 'user' ?
        <View style={[styles.message, styles.yourMessage]} key={index}>
            <Text style={{fontSize:16}}>
                {message.content}
            </Text>
        </View> :

        <View style={[styles.message, styles.assistantMessage]} key={index}>
            <Image style = {styles.duck} source={require('../assets/icon-right-facing.png')}/>
            <Text style={{fontSize:16}}>
                {message.content}
            </Text>
        </View>
    ))
    return (
        <View style={styles.container}>
            <ScrollView>
                {content}
            </ScrollView>
        </View>
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
    duck : {
        width: 40,
        height: 40,
    },
    message : {
        color: 'black',
        padding: 10,
        borderRadius: 10,
        maxWidth: screenWidth * 0.3,
        marginVertical: 5,
        flexDirection: 'row',
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