import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function GenericTextInput({text, onTextChange, label, charLimit, multiline}){
  return(
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        keyboardType='default'
        onChangeText={(text)=>onTextChange(text)}
        value={text}
        maxLength={charLimit}
        style={styles.textInput}
        multiline={multiline}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  }, 
  text: {
    color: 'black', 
    textAlign: 'center'
  }, 
  textInput:{
    borderWidth: 2, 
    borderColor: 'yellow', 
    color: 'black', 
    borderRadius: 5
  }
})