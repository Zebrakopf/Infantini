import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Dimensions} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import ButtonWithBackground from '../../ButtonWithBackground'
import Colors from '../../../../constants/Colors'

var Triangle = (props) => {
    return (
      <View style={[styles.triangle, props.style]} />
    )
  }




var Item = (props)=> {
    return (
      <TouchableOpacity style={[styles.parallelogram, {width:props.width*0.8, backgroundColor:"green", height:"100%", marginLeft:!props.index ? 0 :props.width*0.20,borderRadius:props.width*0.1}]} onPress={()=>{props.handleTabClick(props.index)}}>
        <View style={[styles.parallelogramInner, { alignItems:"center", justifyContent:"center", width:props.width*0.8, backgroundColor: props.index === props.active ? Colors.primary :Colors.compound, height:"100%",borderRadius:props.width*0.1}]}>
          <Text style={{color:"#fff", fontSize:10}}>{props.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }


const ModalTabs = (props) =>{
  const setTabs = () =>{
    let tabWidth = width*0.9 / props.screenNames.length
    return props.screenNames.map((name,index) =>{
      return  <Item key={name} width={tabWidth} name ={name} index={index} active={props.currentTab} handleTabClick={props.onTabClick}/>})
  }

  return(
    <View style={styles.container}>
    {setTabs()}
    </View>
  )
}
const {width,height} = Dimensions.get("window")

const styles = StyleSheet.create({
  controlPanel:{
    width:"100%",
  },
  container:{
    height:height*0.05,
    width:width*0.9,
    flexDirection:'row',
    borderTopLeftRadius:5,
    borderTopRightRadius:5,
    backgroundColor:Colors.compound,
    padding:2
  },
  input:{
  //  height:"100%",
    width:"100%",
    borderColor:Colors.primary,
    borderRadius:4,
    borderColor:"#bbb",
    marginTop:5,
    marginBottom:5,
    paddingHorizontal:2,
    paddingVertical: 5,
    borderBottomColor:'#ccc',
    borderBottomWidth:1

  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.compound
  },
  parallelogram: {
    width: 150,
    height: 100
  },
  parallelogramInner: {
    position: 'absolute',
    left: 0,
    top: 0,
    backgroundColor: '#fff',
    width: 150,
    height: 100,
  },
  parallelogramRight: {
    top: 0,
    right: -50,
    position: 'absolute'
  },
  parallelogramLeft: {
    top: 0,
    left: -50,
    position: 'absolute'
  }

})

export default ModalTabs
