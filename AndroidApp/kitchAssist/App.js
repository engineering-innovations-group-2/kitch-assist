import { useEffect, useState } from "react";
import { StyleSheet, View, Pressable, ToastAndroid, Text } from "react-native";
import {Button, PaperProvider} from "react-native-paper"
import {checkMultiple, requestMultiple, PERMISSIONS} from 'react-native-permissions';
import BluetoothSerial from "react-native-bluetooth-serial-next";
import { NavigationContainer } from "@react-navigation/native";
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/homeScreen/homeScreen";
import BluetoothIndicator from "./headerComponents/bluetoothComponent";
import BluetoothScreen from "./screens/bluetoothScreen/bluetoothScreen";
import MealListWrap from "./screens/mealList/MealListWrap";
import { DatabaseProvider } from "@nozbe/watermelondb/react";
import { database } from "./database";
import { AddMeal } from "./screens/addMeal/addMeal";
import MealInformationWrapper from "./screens/mealInformation/mealInformationWrap";
import QuickMeal from "./screens/quickMealScreen/quickMeal";
const {Navigator, Screen, Group} = createStackNavigator();

export default function App(){
  const [bluetoothState, setBluetoothState]= useState(false);
  const [timeLeft, setTimeLeft] = useState('')


  useEffect(()=>{
    //seek the bluetooth connection on the phone. 
    requestMultiple([
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT, 
      PERMISSIONS.ANDROID.BLUETOOTH_SCAN, 
      PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    ]).then((statuses) => {
    }).catch(error=>{
      console.log(error);
    });
  });

  //Listen to the universal bluetooth state.
  useEffect(()=>{
    //first check if bluetooth is on. Then check the rest and subscribe to states.  
    console.log('registering bluetooth listeners')
    BluetoothSerial.addListener('connectionSuccess', (obj)=>{
      setBluetoothState(true)
      ToastAndroid.show('Connected To Device Successfully', ToastAndroid.SHORT)
      console.log(obj.device)
      BluetoothSerial.read((data, subscription)=>{
        console.log(data)
      })
    });
    
    BluetoothSerial.addListener('connectionFailed', ()=>{
      setBluetoothState(false)
      ToastAndroid.show('Connection To Device Failed', ToastAndroid.SHORT)
    });

    BluetoothSerial.addListener('connectionLost', ()=>{
      setBluetoothState(false)
      ToastAndroid.show('Connection To Device Lost', ToastAndroid.SHORT)
    });
    
    return ()=>{
      console.log('removing all listeners')
      BluetoothSerial.removeAllListeners();
    }
  },[])
  
  useEffect(()=>{
    let intervalId = setInterval(()=>{
        (async()=>{
            let data = await BluetoothSerial.readFromDevice("00:21:09:00:0A:2C");
            if(data){
                //connected and something is cooking. 
                setTimeLeft(data);
            } else {
                //either not connected, or there's nothing cooking at the moment
                setTimeLeft(null)
            }
        })();
    }, 1000)
    return ()=>{
        clearInterval(intervalId);
    }
},[])

  async function connectToBluetooth(){
    let deviceState = await BluetoothSerial.isEnabled();
    console.log(deviceState)

    if(deviceState == true){
      //bluetooth is on, proceeding to connect with HC-05;
      try {
        await BluetoothSerial.connect("00:21:09:00:0A:2C");
      } catch (error) {
        console.log("in the connection phase", error.message)
      }
    } else {
      try {
        await BluetoothSerial.enable();
        await BluetoothSerial.connect("00:21:09:00:0A:2C");
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  async function stopOperation(){
    try {
      await BluetoothSerial.write("S");
    } catch (error) {
      console.log(error.message)
    }
  }
  return(
    <View style={styles.headerContainer}>
      <View 
        style={{height: '10%', backgroundColor: bluetoothState? 'blue': 'red'}}>
          {bluetoothState?
           <View>
            {timeLeft?
             <>
              <Text>Estimated Time Left</Text>
              <Text>{timeLeft}</Text>
              <Button
                onPress={async()=>{
                await stopOperation();
                ToastAndroid.show("Operation Cancelled Successfully!", ToastAndroid.SHORT)
              }}
              >
                stop current operation
              </Button>
             </>:
             <>
              <Text>Connected!</Text>
             </> 
            }
           </View>:
            <View>
              <Button 
                onPress={async()=>{
                  await connectToBluetooth()
                }}>
                  Connect
                </Button>
            </View>
          }

      </View>


      <NavigationContainer>
        <DatabaseProvider database={database}>
        <PaperProvider>
          <Navigator
            screenOptions={{
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: '#40190D', 
              }, 
              headerTitleStyle: {
                fontFamily: 'OpenSans-Regular'
              }
            }}
          >
            <Screen 
              name="homeScreen"
              component={HomeScreen}
              options={({route, navigation})=>({
                title: "Home",
                headerRight: ()=>(
                  <BluetoothIndicator 
                    navigation={navigation}
                  />
                ),
              })}
            />
            <Screen 
              name='bluetoothScreen'
              component={BluetoothScreen}
              options={({route, navigation})=>({
                title: 'Connect to Device'
              })}
            />
            <Screen 
              name= 'mealList'
              component={MealListWrap}
              options={({route, navigation})=>({
                title: 'Meal List'
              })}
            />
            <Screen 
              name = 'addMeal'
              component={AddMeal}
            />
            <Screen 
              name="mealInformation"
              component={MealInformationWrapper}
            />
            <Screen 
              name="quickMeal"
              component={QuickMeal}
              options={{
                title: 'Quick Meal'
              }}
            />
          </Navigator>
        </PaperProvider >
        </DatabaseProvider>
      </NavigationContainer>
    </View>
 )
}


const styles = StyleSheet.create({
  headerContainer: {
    flex: 1, 
  }
})