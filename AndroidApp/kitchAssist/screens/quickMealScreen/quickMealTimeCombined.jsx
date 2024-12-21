import React, { Children } from "react";
import { View, Text, StyleSheet } from "react-native";
import TimeInputContainer from "../addMeal/timeInputContainer";

export default function QuickMealInputComponent({children, question}){
  return(
    <View style={styles.container}>
      <Text style={styles.header}>{question}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2, 
    borderRadius: 5
  }, 
  header: {
    fontFamily: 'OpenSans-Regular', 
    fontSize: 17, 
    textAlign: 'center'
  }
})