import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

import Colors from '../../constants/Colors'
import ButtonWithBackground from '../UI/ButtonWithBackground'
import logo from '../Assets/logoWhite.png'
import Icon from 'react-native-vector-icons/Ionicons';
import { sendEmail } from './sendEmail';
import { saveFile } from './saveText';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import {connect } from 'react-redux';
import * as eventActions from '../store/actions/events'

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
     console.log("sending events")
     let formattedEvents = JSON.stringify(filteredEvents.map(event =>({event})),null,'\t')
     saveFile(formattedEvents,startDate.format('DD_MM_YY'),tempRange.end.format('DD_MM_YY')).then(() => { console.log('Your file was saved!');
                                                                                                          alert('successfully saved file:Infantini_Export'+startDate.format('DD_MM_YY')+'-'+tempRange.end.format('DD_MM_YY')+' in your downloads folder')}).catch((err)=>{alert("error, please contact felix :)");
                                                                                         console.log("file saving error:",err)});
   //   sendEmail( 'recipient', 'Infantino: My Data', JSON.stringify(filteredEvents.map(event =>({event})),null,'\t'), { cc: 'harms.schroeder@gmail.com;' }
   // ).then(() => { console.log('Your message was successfully sent!'); }).catch((err)=>{alert("error");
   //                                                                                    console.log("mail error:",err)});
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

const mapStateToProps = state => {
  return {
    events: state.events.allEvents
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAddEvent: (category, start, duration, qualifier, intensity, fallAsleep, success, description, size, timeStamp) => dispatch(eventActions.addEvent(category, start, duration, qualifier, intensity, fallAsleep, success, description, size, timeStamp)),
    onDeleteEvent: (id) => dispatch(eventActions.deleteEvent(id)),
    onUpdateEvent: (id, category, start, duration, qualifier, intensity, fallAsleep, success, description, size, timeStamp) => dispatch(eventActions.updateEvent(id, category, start, duration, qualifier, intensity, fallAsleep, success, description, size, timeStamp)),

  };
}



export default connect(mapStateToProps, mapDispatchToProps) (Header);
