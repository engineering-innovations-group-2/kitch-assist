import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ActionButton from "./actionButton";
import { Button } from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial-next";
import ActionBox from "./actionBox";

export default function HomeScreen({route, navigation}){
    return(
        <View style={styles.container}>
            <View style={styles.welcomeTextContainer}>
                <Text style={styles.welcomeText}>
                    HI I'M KITCH ASSIST.
                </Text> 
                <Text style={styles.welcomeText}>
                    YOUR AI POWERED KITCHEN ASSISTANT
                </Text>
            </View>
            <View style={styles.bottomContainer}>
                <ActionBox 
                    label={'Cook A Quick Meal'}
                    onPressActionBox={()=>{navigation.navigate('quickMeal')}}
                />
       {/*          <ActionBox 
                    label={'Select Meal From Library'}
                    onPressActionBox={()=>{navigation.navigate('mealList')}}
                /> */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#421B10'
    }, 
    welcomeTextContainer: {
        justifyContent: "center",
        flex: 0.5, 
        backgroundColor: 'grey'
    }, 
    welcomeText: {
        color: "black",
        textAlign: "center",
        fontFamily: 'OpenSans-Regular', 
        fontSize: 16
    }, 
    bottomContainer: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 5

    },
    actionButtonContainer: {
        width: '30%',
        height: '65%',
        zIndex: 5,
        flexDirection: 'column', 
        position: 'absolute', 
        bottom: '0%',
        right: '0%', 
        borderWidth: 2,
        borderRadius: 5
    }
})