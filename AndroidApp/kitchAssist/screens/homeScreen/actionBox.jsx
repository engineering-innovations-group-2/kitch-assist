import React from "react";
import { Text } from "react-native";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ActionBox({label, onPressActionBox}){
  return(
    <TouchableOpacity 
    style={styles.container}
    onPress={()=>{onPressActionBox()}}>
      <View
      style={styles.textAndIconWrap}
      >
        <Text style={styles.actboxtext}>{label}</Text>
        <Icon 
          name="arrow-right-thin"
          size={35}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 3,
    height: '50%',
    // backgroundColor: 'green' 
  },
  textAndIconWrap:{
    flexDirection: 'row', 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: 'yellow'
  },
  actboxtext: {
    textAlign: 'center', 
    fontFamily: 'OpenSans-Bold', 
    fontSize: 20
  }
})