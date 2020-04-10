import React, {useEffect, useState} from'react'
import {View,Text,TouchableOpacity,ScrollView, TextInput, Dimensions,StyleSheet,Easing,Animated,Keyboard} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

const RangeInput = (props) =>{

  const [boxStatus, changeBoxStatus ] = useState()

  const handlePress = (box) =>{
    if(box === 'startDate'){

    }else{

    }
  }

  return(
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <Text style={styles.text}>start date:</Text>
          <TouchableOpacity style={styles.inputBox} onPress={()=>{handlePress('startDate')}}>
            <Text>{props.startDate ? moment(props.startDate).format('DD-MM-YYYY') : '-'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <Text style={styles.text}>end date:</Text>
          <TouchableOpacity style={styles.inputBox} onPress={()=>{handlePress('endDate')}}>
          <Text>{props.endDate ? moment(props.endDate).format('DD-MM-YYYY') : "-"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',

  },
  inputContainer:{
    width:'50%',
    height:'100%',
    alignItems:'center',
    justifyContent:'center',
    //backgroundColor:'blue'
  },
  input:{
    alignItems:'flex-start',
    justifyContent:'flex-end',
    height:"100%",
    width:'100%',
  },
  inputBox:{
    height: 30,
    width:'90%',
    borderRadius:20,
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:12,
    color:"#fff",
    marginBottom:4
  }
})

export default RangeInput
