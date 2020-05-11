import React, {Component} from 'react'
import {Platform, View, Text, StyleSheet, Button, Picker, Dimensions, KeyboardAvoidingView,ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import InfoModal from './InfoModal'

import ButtonWithBackground from '../../ButtonWithBackground'


const EventModal = ({ navigation, route }) => {

  const {onPressAccept} = route.params
  const {category} = route.params

  let screenHeight = Dimensions.get("window").height
  return(
    <View style={styles.modalContainer} onStartShouldSetResponder={(event) => {if((event.nativeEvent.pageY /screenHeight) < 0.1  || (event.nativeEvent.pageY /screenHeight) > 0.8){navigation.pop()}}}>
    <ScrollView contentContainerStyle={{width:"100%",height:'100%',justifyContent:'flex-start',paddingTop:'40%'}}>

      <InfoModal onClose={navigation.pop} onAccept={onPressAccept} category={category}/>

    </ScrollView>
    </View>

  )
}


//onStartShouldSetResponder={(event) => {if((event.nativeEvent.pageY /screenHeight) < 0.25  || (event.nativeEvent.pageY /screenHeight) > 0.85){this.props.onPressCancel()}}} <---this line cancels the modal if the user presses next to it

const {width,height} = Dimensions.get("window")
const styles = StyleSheet.create({

  buttonContainer:{
    flexDirection:"row",
    width:"100%",
    height:"20%",
  },

  modalTitle:{
    width:"100%",
    height:"25%",
    alignItems:"center",
    justifyContent:"center",
  },
  inputContainer:{
    width:"100%",
    height:"60%",
    flexDirection:"row"
  },
  inputTitle:{
    margin:5,
    width:"25%",
    height:"30%"
  },
  modalContainer:{
    // flex:1,
    // width:width,
    // height:height,
    // backgroundColor:"#fff",
    // justifyContent:"flex-end",
    // alignItems: "center",
    width:'100%',
    height:"100%",
    position:"absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor:"rgba(0,0,0,0.8)",
    justifyContent:"center",
    alignItems: "center",
    elevation:10
  },
  popUpContainer:{
    width:"90%",
    height:80,
    marginBottom:Dimensions.get("window").height*0.085,
  },

  popUpContent:{
    height:"100%",
    width:"25%",
    backgroundColor:"#86cce3",
    flexDirection:"row"
  },
  buttonMenue:{
    height:"100%",
    justifyContent:"center",
    alignItems: "center",
}

})


export default EventModal;
