import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';
import ButtonWithBackground from '../ButtonWithBackground'
import Colors from '../../../constants/Colors'

const DescriptionInput = (props) =>{
  const [length,setLength] = useState("Select the duration")
  const [descriptionInput,setDescription] = useState("")
  const lengths = [5,10,15,20,25,30,35,40,45,50,55,60]
  const elements = lengths.map(x => <TouchableOpacity key={x} style={styles.item} onPress={()=>{props.onSelect(x)
                                                                                        setLength(String(x)+" minutes")}}>
                                    <Text style={styles.text}>{x} minutes</Text>
                                  </TouchableOpacity>)
  return(
      <View style={{height:"70%", width:"90%", marginTop:10}}>
        <ScrollView style={styles.scroller} contentContainerStyle={{alignItems:"center",justifyContent:"center"}} pagingEnabled>
          {elements}
        </ScrollView>
      </View>
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
    width:300

  },
  text:{
  },

})

export default DescriptionInput
