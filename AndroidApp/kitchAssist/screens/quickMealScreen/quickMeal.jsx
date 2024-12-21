import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import QuickTimeComponent from "./quickMealTimeCombined";
import TimeInputContainer from "../addMeal/timeInputContainer";
import ActionButton from "../homeScreen/actionButton";
import BluetoothSerial from "react-native-bluetooth-serial-next";

export default function QuickMeal(){
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  
  async function handleSubmission(){
    let time = `C${hours}:${minutes}:${seconds}`
    try {
      await BluetoothSerial.write(time);
    } catch (error) {
      console.log(error.message)
    }
    setHours('')
    setMinutes('')
    setSeconds('')
  }

  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Yay! Let's Cook Something Quick!</Text>
      </View>

      {/**the components ask the questions.*/}
      <QuickTimeComponent question={'How Long Is This Going To Take?'}>
        <TimeInputContainer 
          hours={hours}
          setHours={(text)=>{setHours(text)}}
          minutes={minutes}
          setMinutes={(text)=>{setMinutes(text)}}
          seconds={seconds}
          setSeconds={(text)=>{setSeconds(text)}}
        />
      </QuickTimeComponent>

      <View style={styles.actbtncontainer}>
        <ActionButton 
          iconName={'check'}
          onIconPress={async()=>{
            console.log('sending payload')
            await handleSubmission();
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: '#421B10',
    padding: 10
  }, 
  headerContainer:{
    flex: 0.2
  },
  headerText: {
    fontFamily: 'OpenSans-Regular', 
    fontSize: 20, 
    textAlign: 'center'
  }, 
  actbtncontainer: {
    height: '10%',
    width: '20%', 
    position: 'absolute',
    bottom: '10%',
    right: '0%'
  }
})