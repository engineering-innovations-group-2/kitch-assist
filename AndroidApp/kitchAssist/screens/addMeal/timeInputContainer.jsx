import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import TimeInputComponent from "./timeInputComponent";

export default function TimeInputContainer({hours, setHours, minutes, setMinutes, seconds, setSeconds}){
  return(
    <View style={styles.container}>
      <TimeInputComponent 
        label={'hh'}
        text={hours}
        onTextChange={(text)=>setHours(text)}
      />
      <TimeInputComponent 
        label={'mm'}
        text={minutes}
        onTextChange={(text)=>setMinutes(text)}
      />
      <TimeInputComponent 
        label={'ss'}
        text={seconds}
        onTextChange={(text)=>setSeconds(text)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }
})