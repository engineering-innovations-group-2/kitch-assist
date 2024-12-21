import { useDatabase } from "@nozbe/watermelondb/react";
import React from "react";
import { EnhancedMealList } from "./MealList";
import { Button, StyleSheet, View } from "react-native";
import ActionButton from "../homeScreen/actionButton";

export default function MealListWrap({navigation, route}){
  const database = useDatabase();
  
  function queryForAllMeals(){
    return database.get('meal_list').query();
  }

  return(
    <View style={styles.container}>
      <EnhancedMealList meals={queryForAllMeals()} navigation={navigation}/>
      <View style={styles.actionButtonContainer}>
        <ActionButton 
          iconName={"plus"}
          onIconPress={()=>{
            navigation.navigate('addMeal')
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#421B10', 
    flex: 1
  }, 
  actionButtonContainer: {
    height: '10%',
    width: '20%',
    position: 'absolute', 
    bottom: '7%', 
    right: '2.5%'
  }
})