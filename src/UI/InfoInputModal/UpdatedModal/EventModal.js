import React, {Component} from 'react'
import {View, Text, StyleSheet, Button, Picker, Dimensions, KeyboardAvoidingView} from 'react-native'
import TimePicker from '../../TimePicker'
import Icon from 'react-native-vector-icons/Ionicons'

import InfoModal from './InfoModal'

import ButtonWithBackground from '../../ButtonWithBackground'


class EventModal extends Component{
  constructor(props){
    super(props)
    this.state={
      infoNeeded:""
    }

}




  render(){
  let screenHeight = Dimensions.get("window").height
  return(
    <View style={styles.modalContainer} onStartShouldSetResponder={(event) => {
                                                                              //  if((event.nativeEvent.pageY /screenHeight) < 0.30  || (event.nativeEvent.pageY /screenHeight) > 0.80){this.props.onPressCancel()}
                                                                              }}>
      <InfoModal onClose={this.props.onPressCancel} onAccept={this.props.onPressAccept} category={this.props.category}/>
    </View>

  )
}

}

const styles = StyleSheet.create({
  modalBox:{
    width:"60%",
    height:"20%",
    backgroundColor:"#009E95",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"flex-end",
  },
  buttonContainer:{
    flexDirection:"row",
    width:"100%",
    height:"20%",
  },
  buttonRight:{
    width:"50%",
    height:"100%",
    borderTopWidth:1,
    borderLeftWidth:1,
    alignItems:"center",
    justifyContent:"center",
  },
  buttonLeft:{
    width:"50%",
    height:"100%",
    borderTopWidth:1,
    alignItems:"center",
    justifyContent:"center",
  },
  buttonText:{
    textDecorationLine:"underline",
    fontFamily:"Roboto",
    fontWeight:"bold",
    color:"white"
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
    flex:1,
    width:"100%",
    height:"100%",
    backgroundColor:"red",
    justifyContent:"flex-end",
    alignItems: "center",
  },
  popUpContainer:{
    width:"90%",
    height:80,
    marginBottom:Dimensions.get("window").height*0.085,
  },
  popUpBox:{
    flex: 1,
    backgroundColor:"#86cce3",
    borderRadius:5,
    flexDirection:"row",
    justifyContent:"space-between",
    //alignItems: "center",
    padding:20
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
  },
  popUpTriangle:{
    marginLeft:20,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 12,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: "#86cce3",
    transform: [
        {rotate: '180deg'}
      ]
  }

})


export default EventModal;
