import React from 'react'
import {View, StyleSheet,Text} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../../constants/Colors'
import ButtonWithBackground from '../../ButtonWithBackground'


const InfoPage = (props) =>{
  let lastPage = props.lastScreen
  return(
    <View style={props.style}>
      <View style={styles.titleLine}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={{height:"80%", width:"90%", alignItems:"center", justifyContent:"center"}}>
        {props.children}
      </View>
      <View style={styles.buttonLine}>
        <ButtonWithBackground style={{...styles.buttonLeft,backgroundColor:props.ready ? 'green' :"#bbb"}} title={"Finish"} onPress={() =>{props.onAccept()}} disabled={!props.ready}><Text style={{color:props.ready ? '#fff' :"#E0E0E0", fontSize:18}}>Finish</Text></ButtonWithBackground>
        <ButtonWithBackground style={{...styles.buttonRight,backgroundColor:lastPage ? "#bbb" : Colors.primary}} title={"Next"} onPress={() =>{props.onNext()}} disabled={lastPage}><Text style={{color:lastPage ? "#E0E0E0" : "#fff", fontSize:18}}>Next</Text></ButtonWithBackground>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonLine:{
    width:"100%",
    height:"10%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  buttonLeft:{
    height:"100%",
    width:"40%",
    backgroundColor: "green",
    marginBottom:10,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20
  },
  buttonRight:{
    height:"100%",
    width:"40%",
    backgroundColor: Colors.primary,
    marginBottom:10,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20
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
