import { Q } from "@nozbe/watermelondb";
import { useDatabase } from "@nozbe/watermelondb/react";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { EnhancedMealInformation } from "./mealInformation";

export default function MealInformationWrapper({route, navigation}){
  const params = route.params;
  const database = useDatabase();
  
function queryMeal(){
    return(
      database.get('meal_list').query(
        Q.where('id', params.id)
      )
    )
  }

  return(
    <View style={styles.container}>
      <EnhancedMealInformation queriedMeal={queryMeal()}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'brown'
  }
})