import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial-next";
import { ActivityIndicator, Modal, Portal } from "react-native-paper";

export default function BluetoothScreen(){
  const [listOfDevices, setListOfDevices] = useState([]);
  const [showConnectModal, setShowConnectModal] = useState(false);


  useEffect(()=>{
    (async()=>{
      let state = await BluetoothSerial.isEnabled();
      //check if bluetooth is on and prompt the user to turn it on. 
      if(state == true){
        let pairedDevices = await BluetoothSerial.list();
        setListOfDevices([...pairedDevices]);
      } else {
        //bluetooth is off, tell the user to turn it on.
        console.log('triggering the no bluetooth clause.')
        setShowConnectModal(true);
      }
    })();
  },[])


  return(
    <View style={{flex: 1, backgroundColor: 'grey'}}>
      {listOfDevices.length == 0?
        <ActivityIndicator color="black" size={30}/>:
        <FlashList 
          data={listOfDevices}
          estimatedItemSize={43}
          renderItem={({item})=>(
            <IndividualBluetoothDevice item={item}/>
          )}
        />
      }
      <Portal>
        <Modal 
          visible={showConnectModal} 
          onDismiss={()=>setShowConnectModal(false)}
        >
          <Text>You are not connected to bluetooth</Text>
        </Modal>
      </Portal>
    </View>
  )
}

function IndividualBluetoothDevice({item}){
  const [isConnected, setIsConnected] = useState(false)
  useEffect(()=>{
    (async()=>{
      let state = await BluetoothSerial.isConnected(item.id);
      setIsConnected(state);
    })()
  })

  return(
    <Pressable 
      onPress={async()=>{
        try {
          BluetoothSerial.connect(item.id);
        } catch (error) {
          console.log(error.message)
        }
      }} 
      style={{backgroundColor: 'yellow', borderWidth: 2, flex: 0.8, flexDirection: 'row'}}
    >
      <View>
        <Text style={{color: 'black'}}>{item.name}</Text>
        <Text style={{color: 'black'}}>{item.id}</Text>
      </View>
      <View style={{backgroundColor: isConnected? 'green': 'red', flex: 0.2}}></View>
    </Pressable>
  )
}