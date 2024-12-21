import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function TimeInputComponent({text, onTextChange, label}){
  return(
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput 
        keyboardType='number-pad'
        onChangeText={(text)=>onTextChange(text)}
        value={text}
        maxLength={2}
        style={styles.textInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  }, 
  text: {
    color: 'grey', 
    textAlign: 'center'
  }, 
  textInput:{
    borderWidth: 2,
    borderRadius: 5, 
    borderColor: 'grey',
    color: 'grey'
  }
})