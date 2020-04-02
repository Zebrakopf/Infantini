import React from 'react'
import {View, StyleSheet,Text,Button, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../../constants/Colors'
import ButtonWithBackground from '../../ButtonWithBackground'


const InfoPage = (props) =>{

  const status = props.stateVis(props.screen, props.category, props.currentScreen)
  console.log(status)
  return(
     status === "Hidden" ? null : status === 'Collapse' ?
     <TouchableOpacity style={[props.style,{height:'8%', borderWidth:0.5, borderColor:'#E0E0E0', backgroundColor:"#F0F0F0"}]} onPress={() => {props.onNext(props.screen)}} >
        <TouchableOpacity style={[styles.titleLine, {borderBottomWidth: 0}]} onPress={() => {props.onNext(props.screen)}} >
          <Text style={styles.title}>{props.title}</Text>
        </TouchableOpacity>
      </TouchableOpacity> :
      <View style={props.style}>
        <View style={[styles.titleLine,  status === "Collapse" ? {borderBottomWidth: 0} :null ]} >
          <Text style={styles.title}>{props.title}</Text>
        </View>
    { status === "Collapse" ? null :
      <View style={{height:"80%", width:"90%", alignItems:"center", justifyContent:"center"}}>
        {props.children}
      </View>}
      {status === "Collapse" ? null :
      <View style={styles.buttonLine}>
        <ButtonWithBackground style={styles.button} title={"Cancel"} onPress={() =>{console.log("why cancle")}}><Text style={{color:"red", fontSize:18}}>Cancel</Text></ButtonWithBackground>
        <ButtonWithBackground style={styles.button} title={"Accept"} onPress={props.onNext}><Text style={{color:Colors.primary, fontSize:18}}>Next</Text></ButtonWithBackground>
      </View>}
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
  button:{
    height:"100%",
    marginBottom:10,
    alignItems:"center",
    justifyContent:"center",
  },
  titleLine:{
    height:"10%",
    width:"90%",
    alignItems:"center",
    justifyContent:"center",
    marginTop:4,
    borderBottomWidth:1,
    borderColor:"#bbb"
  },
  title:{
    fontFamily:"Roboto",
    fontSize:20,
    fontWeight:"bold"
  }
})

export default InfoPage
