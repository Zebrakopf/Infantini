import React from 'react'
import {View, StyleSheet,Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/Colors'
import ButtonWithBackground from '../ButtonWithBackground'


const InfoPage = (props) =>{

  return(
    <View style={props.style}>
      <View style={styles.titleLine}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={{height:"80%", width:"90%", alignItems:"center", justifyContent:"center"}}>
        {props.children}
      </View>
      <View style={styles.buttonLine}>
        <ButtonWithBackground style={styles.button} title={"Cancel"} onPress={() =>{props.onClose()}}><Text style={{color:"red", fontSize:18}}>Cancel</Text></ButtonWithBackground>
        <ButtonWithBackground style={styles.button} title={"Accept"} onPress={() =>{props.onAccept()}}><Text style={{color:"green", fontSize:18}}>Accept</Text></ButtonWithBackground>
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
  button:{
    height:"100%",
    backgroundColor: "#fff",
    marginBottom:10,
    alignItems:"center",
    justifyContent:"center",
  },
  titleLine:{
    height:"10%",
    width:"90%",
    alignItems:"center",
    justifyContent:"center",
    marginTop:4
  },
  title:{
    fontFamily:"Roboto",
    fontSize:20,
    fontWeight:"bold"
  }
})

export default InfoPage
