import React, {useState,useEffect} from 'react'
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import ButtonWithBackground from '../../ButtonWithBackground'
import Colors from '../../../../constants/Colors'

const DurationInput = (props) =>{
  const [descriptionInput,setDescription] = useState("")
  useEffect(()=>{
    props.onChangeDescription(descriptionInput)
  },[descriptionInput])
  return(
      <View style={styles.controlPanel}>
        <TextInput style={styles.input}  value={descriptionInput} onChangeText={(text) => setDescription(text)} placeholder="Enter description"/>
      </View>
  )
}

const styles = StyleSheet.create({
  controlPanel:{
    width:"100%",
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

  }

})

export default DurationInput
