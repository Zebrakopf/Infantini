import React, {useState,useEffect} from 'react'
import {View,TouchableWithoutFeedback,Text, StyleSheet} from 'react-native'
import Colors from '../../../../constants/Colors'



const SuccessSelector = (props) =>{
    const [selected,handleSelect] = useState("not selected")
    useEffect(()=>{props.handleSuccessChange(selected)},[selected])

  return(
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={()=>{handleSelect("yes")}}>
        <View style={[styles.yesNo,{backgroundColor:"green",borderWidth: selected== "yes" ? 5 :0, borderColor:Colors.compound, opacity:selected== "yes" ? 1 :0.5}]}>
          <Text style={styles.text}>Yes</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback style={[styles.yesNo,{backgroundColor:"red",borderWidth: selected== "no" ? 5 :0, borderColor:Colors.compound, opacity:0.1}]} onPress={()=>{handleSelect("no")}}>
      <View style={[styles.yesNo,{backgroundColor:"red",borderWidth: selected== "no" ? 5 :0, borderColor:Colors.compound, opacity:selected== "no" ? 1 :0.5}]}>
        <Text style={styles.text}>No</Text>
      </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:"100%",
    flexDirection:"row",
    alignItems:'center'
  },
  yesNo:{
    width:"50%",
    height:"80%",
    justifyContent:"center",
    alignItems:"center",
  },
  text:{
    fontSize:30,
    fontWeight:'bold'
  }
})


export default SuccessSelector
