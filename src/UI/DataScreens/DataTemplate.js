import React from 'react'
import {View, StyleSheet,Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/Colors'
import ButtonWithBackground from '../ButtonWithBackground'


const DataTemplate = (props) =>{

  return(
    <View style={props.style}>
      <View style={styles.titleLine}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={{height:"90%", width:"90%", alignItems:"center", justifyContent:"center"}}>
        {props.children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonLine:{
    width:"90%",
    height:"10%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  titleLine:{
    height:"10%",
    width:"90%",
    alignItems:"center",
    justifyContent:"center",
  },
  title:{
    fontFamily:"Roboto",
    fontSize:20,
    fontWeight:"bold"
  }
})

export default DataTemplate
