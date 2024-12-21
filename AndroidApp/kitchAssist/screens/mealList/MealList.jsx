import { FlashList } from "@shopify/flash-list";
import React from "react";
import { withObservables } from '@nozbe/watermelondb/react'
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";

export function MealList({meals, navigation}){
//data comes from the wrapper, which queries the table for entries of food. 
  return(
    <FlashList 
      data={meals}
      estimatedItemSize={70}
      renderItem={({item})=>(
        <IndividualMealInformation item={item} navigation={navigation}/>
      )}
    />
  )
}

//Individual Element of the entire thing. 
function IndividualMealInformation({item, navigation}){
  return(
    <TouchableOpacity 
      style={styles.individualMealInfoContainer}
      onPress={()=>{
        navigation.navigate('mealInformation', {id: item.id})
      }}
    >
      <View>
        <Text style={styles.mealNameText}>{item.mealName}</Text>
      </View>
    </TouchableOpacity>
  )
}

//enhance is a function that you use to wrap the component. 
let enhance = withObservables(['meals'], ({meals})=>({
  meals
}))

export const EnhancedMealList = enhance(MealList);

const styles = StyleSheet.create({
  individualMealInfoContainer: {
    height: 70, 
    width: '100%',
    // borderWidth: 2, 
    marginVertical: 2,
    backgroundColor: 'grey',
    borderRadius: 5
  }, 
  flashListContainer: {
    flex: 1
  }, 
  mealNameText: {
    fontFamily: 'OpenSans-Bold'
  }
})