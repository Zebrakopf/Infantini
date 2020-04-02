import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import ButtonWithBackground from './ButtonWithBackground'
import Colors from '../../constants/Colors'

const TimePicker = (props) =>{
  const [length,setLength] = useState("Select the duration")
  const [descriptionInput,setDescription] = useState("")
  const lengths = [5,10,15,20,25,30,35,40,45,50,55,60]
  const elements = lengths.map(x => <TouchableOpacity key={x} style={styles.item} onPress={()=>{props.onSelect(x)
                                                                                        setLength(String(x)+" minutes")}}>
                                    <Text style={styles.text}>{x} minutes</Text>
                                  </TouchableOpacity>)
  return(
    <KeyboardAvoidingView style={styles.scrollContainer}>
      <View style={{height:"55%", width:"90%", marginTop:10}}>
      <ScrollView style={styles.scroller} contentContainerStyle={{alignItems:"center",justifyContent:"center"}}>
        {elements}
      </ScrollView>
      </View>
      <View style={styles.controlPanel}>
        <TextInput style={styles.input}  value={descriptionInput} onChangeText={(text) => {setDescription(text)}} placeholder="Enter description"/>
      <View style={styles.buttonLine}>
      <ButtonWithBackground style={styles.button} title={"Cancel"} onPress={() =>{props.onClose()}}><Icon name={"md-close"} size={15} color={"white"}/></ButtonWithBackground>
      <Text style={{color:"#fff"}}>{length}</Text>
      <ButtonWithBackground style={styles.button} title={"Accept"} onPress={() =>{props.onAccept(descriptionInput)}}><Icon name={"md-checkmark"} size={15} color={"white"}/></ButtonWithBackground>
      </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  scrollContainer:{
    position:"absolute",
    height: "50%",
    width:"90%",
    backgroundColor:"#fff",
    bottom:20,
    borderRadius:4,
    borderWidth:2,
    borderColor:Colors.light,
    backgroundColor:Colors.compound,
    alignItems:"center",
    //justifyContent:"center",
  },
  scroller:{
    backgroundColor:'#fff',
    borderRadius:4,
  },
  item:{
    alignItems:"center",
    justifyContent:"center",
    borderBottomWidth:1,
    height:50,
    width:"90%"

  },
  text:{
  },
  controlPanel:{
    width:"100%",
    height:"40%",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor:Colors.compound,
    borderRadius:4,
  },
  buttonLine:{
    width:"90%",
    height:"30%",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
  },
  button:{
    width:30,
    height:30,
    backgroundColor: Colors.light,
    marginBottom:5,
    borderRadius:4,
    alignItems:"center",
    justifyContent:"center",
  },
  input:{
    height:"60%",
    width:"90%",
    borderColor:Colors.primary,
    borderWidth:1,
    borderRadius:4,
    backgroundColor:"#fff",
    marginTop:5,
    marginBottom:5,
    padding:2

  }

})

export default TimePicker
