import { withObservables } from "@nozbe/watermelondb/react";
import React from "react";
import { Button, Text, View } from "react-native";
import BluetoothSerial from "react-native-bluetooth-serial-next";

function MealInformation({queriedMeal}){
  const [meal] = queriedMeal;


  return(
    <View>
      <Text style={{color: 'yellow'}}>{meal.mealName}</Text>
      <Text style={{color: 'yellow'}}>{meal.description}</Text>
      <Text style={{color: 'yellow'}}>{meal.timeInfo}</Text>
      <Button
        title="start"
        color={'grey'}
        onPress={async()=>{
          console.log('sending signal to HC-05')
          try{
            await BluetoothSerial.write(`C${meal.timeInfo}`)
          } catch(error){
            console.log(error.message)
          }
        }}
      />
    </View>
  )
}

const enhance = withObservables(['queriedMeal'], ({queriedMeal})=>({
  queriedMeal
}))

export const EnhancedMealInformation = enhance(MealInformation);