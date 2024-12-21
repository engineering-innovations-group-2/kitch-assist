import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ActionButton({iconName, onIconPress}){
  return(
    <Pressable 
    style={styles.actbtncontainer}
    onPress={onIconPress}>
      <View style={styles.actbtnWrap}>
        <Icon 
          name={iconName}
          style={{flex: 1}}
          color={'white'}
          size={50}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  actbtncontainer: {
    flex: 1,
    borderRadius: 2000,
    backgroundColor: 'grey', 
    justifyContent: 'center',
    alignItems: 'center', 
    marginHorizontal: 10,
    marginVertical: 3
  }, 
  actbtnWrap: {
    position: 'absolute'
  }
})