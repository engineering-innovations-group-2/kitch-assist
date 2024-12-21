import React, { useEffect, useState } from "react";
import { View } from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial-next";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function BluetoothIndicator({navigation}){
  const [connectedState, setConnectedState] = useState(false)
  
  useEffect(()=>{
    (async()=>{
      const connectedDevice = await BluetoothSerial.isConnected("00:21:09:00:0A:2C");
      setConnectedState(connectedDevice);
    })();


  },[])


  return(
    <View>
      <Icon 
      name="bluetooth"
      color={connectedState? 'blue': 'grey'}
      size={30}
      onPress={async()=>{
        console.log('attempting connection')
        try {
          const device = await BluetoothSerial.connect("00:21:09:00:0A:2C");
          if (device){
           console.log('connection was successful, change state of the icon.')
          } else {
           console.log('could not connect.')
          }         
        } catch (error) {
          console.log('there was an error in connecting the bluetooth')
        }
      }}/>
    </View>
  )
}