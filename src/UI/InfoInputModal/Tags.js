import React,{useEffect} from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import Colors from '../../../constants/Colors'

const Tags = props => {

useEffect(()=>{
  console.log("I updated",props.name)
},[props.selected])
  return(
    <TouchableOpacity style={styles.container} onPress={()=>{props.onClick(props.name); console.log(props.selected)}} onLongPress={()=>{props.onDelete(props.name, props.category)}}>
      <View style={[styles.actualTag, {backgroundColor:props.selected ? Colors.primary : Colors.compound}]}>
        <View style={[styles.popUpTriangle, {borderBottomColor: "#fff"}]}>
        </View>
        <Text style={{fontSize:8,marginLeft:5}}>{props.name}</Text>
      </View>
      <View style={[styles.popUpTriangle, {borderBottomColor: props.selected ? Colors.primary : Colors.compound}]}>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  popUpTriangle:{
    //marginLeft:20,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: "#86cce3",
    transform: [
        {rotate: '90deg'}
      ]
  },
  container:{
    height:20,
    width:80,
    flexDirection:"row",
    justifyContent:"center",
    marginLeft:5,
    marginBottom:2
  },
  actualTag:{
    backgroundColor:Colors.primary,
    width:60,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"flex-start"

  }
})

export default Tags
