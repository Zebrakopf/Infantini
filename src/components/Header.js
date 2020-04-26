import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

import Colors from '../../constants/Colors'
import ButtonWithBackground from '../UI/ButtonWithBackground'
import logo from '../Assets/logoWhite.png'
import Icon from 'react-native-vector-icons/Ionicons';
import { sendEmail } from './sendEmail';
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment)


const Header = (props) =>{
 const handleExport = () =>{
  props.onNavigate('DateInput',{Range:true, pushSelection:(res)=>{commitMail(res)}})

 }
 const commitMail = (dateRange) =>{
   const { startDate } = dateRange
   const { endDate } = dateRange
   if(startDate && endDate){
     let tempRange = moment.range(startDate, endDate)
     let filteredEvents = props.events.filter((evt)=>tempRange.contains(moment(evt.timeStamp.startDateObj)))
     sendEmail( 'recipient', 'Infantino: My Data', JSON.stringify(filteredEvents.map(event =>({event})),null,'\t'), { cc: 'harms.schroeder@gmail.com;' }
               ).then(() => { console.log('Your message was successfully sent!'); });
   }
 }
  return(
    <View style={styles.container}>
      <View style={styles.backButton}>
      {props.backButton ?  <ButtonWithBackground style={{marginLeft:10, width:"40%", height:"70%", alignItems:"flex-start", justifyContent:"center"}} title={"Cancel"} onPress={() =>{props.onClose("Home")}}><Icon name={"md-arrow-back"} size={25} color={"white"}/></ButtonWithBackground>
      : <ButtonWithBackground style={{marginLeft:10, width:"40%", height:"70%", alignItems:"flex-start", justifyContent:"center"}} title={"Cancel"} onPress={() =>{handleExport()}}><Icon name={"md-mail"} size={25} color={"white"}/></ButtonWithBackground>
      }

      </View>
      <View style={styles.title}>
        <Text style={styles.text}>{props.title == 'Home' ? null : props.title}</Text>
      </View>
      <View style={styles.options}>
        <ButtonWithBackground style={{marginRight:10, width:"40%", height:"70%", alignItems:"flex-end", justifyContent:"center"}} title={"Cancel"} onPress={()=>{if(props.onNavigate){
                                                                                                                                                            props.onNavigate('Settings')
                                                                                                                                                          }}}><Icon name={"md-settings"} size={25} color={"white"}/></ButtonWithBackground>
      </View>
    </View>
  )
}

// {props.backButton ?  <ButtonWithBackground style={{marginLeft:10, width:"40%", height:"70%", alignItems:"flex-start", justifyContent:"center"}} title={"Cancel"} onPress={() =>{props.onClose("Home")}}><Icon name={"md-arrow-back"} size={25} color={"white"}/></ButtonWithBackground>
// : {<Image style={{height:"70%", width:"40%",marginLeft:10}} source={logo} resizeMode={"contain"}/>
// }}

const styles = StyleSheet.create({
  container:{
    width:"100%",
    height:"8%",
    backgroundColor: Colors.primary,
    flexDirection:"row"
  },
  backButton:{
    width:"25%",
    height:"100%",
    alignItems:"center",
    justifyContent:"flex-start",
    flexDirection:"row",
  },
  title:{
    width:"50%",
    height:"100%",
    alignItems:"center",
    justifyContent:"center"
  },
  options:{
    width:"25%",
    height:"100%",
    alignItems:"center",
    justifyContent:"flex-end",
    flexDirection:"row"
  },
  button:{},
  text:{
    color:"white",
    fontSize:18
  }
})

export default Header
