import React from 'react'
import {View, Text, StyleSheet, Image} from 'react-native'

import Colors from '../../constants/Colors'
import ButtonWithBackground from '../UI/ButtonWithBackground'
import logo from '../Assets/logoWhite.png'
import Icon from 'react-native-vector-icons/Ionicons';
import { sendEmail } from './sendEmail';
const Header = (props) =>{

  return(
    <View style={styles.container}>
      <View style={styles.backButton}>
      {props.backButton ?  <ButtonWithBackground style={{marginLeft:10, width:"40%", height:"70%", alignItems:"flex-start", justifyContent:"center"}} title={"Cancel"} onPress={() =>{props.onClose("Home")}}><Icon name={"md-arrow-back"} size={25} color={"white"}/></ButtonWithBackground>
      : <ButtonWithBackground style={{marginLeft:10, width:"40%", height:"70%", alignItems:"flex-start", justifyContent:"center"}} title={"Cancel"} onPress={() =>{sendEmail(
                                                                                                                                                                          'recipient',
                                                                                                                                                                             'Infantino: My Data',
                                                                                                                                                                          JSON.stringify(props.events.map(event =>({event})),null,'\t'),
                                                                                                                                                                       { cc: 'harms.schroeder@gmail.com;' }
                                                                                                                                                                      ).then(() => {
                                                                                                                                                                          console.log('Your message was successfully sent!');
                                                                                                                                                                      });}}><Icon name={"md-mail"} size={25} color={"white"}/></ButtonWithBackground>
      }

      </View>
      <View style={styles.title}>
        <Text style={styles.text}>{props.title == 'Home' ? null : props.title}</Text>
      </View>
      <View style={styles.options}>
        <ButtonWithBackground style={{marginRight:10, width:"40%", height:"70%", alignItems:"flex-end", justifyContent:"center"}} title={"Cancel"} onPress={()=>{if(props.onOptions){
                                                                                                                                                            props.onOptions()
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
    height:"10%",
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
