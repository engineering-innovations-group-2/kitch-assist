import React, { useState } from "react";
import { Button, StyleSheet, ToastAndroid, View } from "react-native";
import TimeInputContainer from "./timeInputContainer";
import GenericTextInput from "./genericTextInput";
import { useDatabase } from "@nozbe/watermelondb/react";

export function AddMeal(){
  const database = useDatabase();

  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [nameOfMeal, setNameOfMeal] = useState('')
  const [description, setDescription] = useState('')
  const [recipeInfo, setRecipeInfo] = useState('')

  let formInformation = {
    mealName: nameOfMeal, 
    timeInfo: `${hours}:${minutes}:${seconds}`, 
    description: description,
    recipeInfo: recipeInfo
  }

  async function addMeal({mealName, timeInfo, description, recipeInfo}){
    await database.write(async()=>{
      const createdMeal = await database.get('meal_list').create(meal=>{
        meal.mealName = mealName
        meal.timeInfo = timeInfo
        meal.description = description
        meal.recipeInfo = recipeInfo
      })
    });
    ToastAndroid.show('Successfully Added Meal To Library', ToastAndroid.SHORT);
  }
  


  return(
    <View style={styles.container}>
      {/**Name of the meal and the time are required for the addition of the food to the library. */}
      <GenericTextInput 
        label={'Name of Meal'}
        charLimit={20}
        text={nameOfMeal}
        onTextChange={(text)=>{
          setNameOfMeal(text)
        }}
      />
      <GenericTextInput 
        label={'Description'}
        charLimit={50}
        text={description}
        onTextChange={(text)=>{
          setDescription(text)
        }}
      />
      <GenericTextInput 
        label={'Recipe Information'}
        charLimit={250}
        text={recipeInfo}
        onTextChange={(text)=>{
          setRecipeInfo(text)
        }}
        multiline={true}
      />

      <TimeInputContainer 
        hours={hours}
        setHours={(text)=>setHours(text)}
        minutes={minutes}
        setMinutes={(text)=>setMinutes(text)}
        seconds={seconds}
        setSeconds={(text)=>setSeconds(text)}
      />
      <Button 
        title = 'Add Meal To Library'
        onPress={()=>addMeal(formInformation)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})