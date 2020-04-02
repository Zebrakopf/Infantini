import React, {Component} from 'react'
import {View, FlatList,Text, StyleSheet, Button,PanResponder, Animated, Dimensions } from 'react-native'
import DateBar from "./DateBar"
import moment from 'moment'

import ButtonWithBackground from './ButtonWithBackground'



class DatePicker extends Component{

  constructor(props){
    super(props);
}

  render(){
  return(
    <View style ={[styles.dateContainer,{backgroundColor:this.props.colorTest}]}>
    <DateBar colorTest={this.props.colorTest} pressChange={this.props.pressChange} title={this.props.currentMonth} content={this.props.currentDay} date={this.props.date}
              next={this.props.nextDay} prev={this.props.prevDay}/>
    <DateBar colorTest={this.props.colorTest} pressChange={this.props.pressChange} title={"Hour"} content={this.props.currentHour} date={this.props.date}
              next={this.props.nextHour} prev={this.props.prevHour}/>
    </View>
)}
}
const styles = StyleSheet.create({
  dateContainer:{
    width:"100%",
    height:"100%",
    backgroundColor:"#fff",
    justifyContent:"center",
    alignItems: "center"
},
  dateText:{
    fontSize: 20,
    fontWeight:"bold",
    color: "black",
    letterSpacing: 1,
  },
  dateBar:{
    width:"100%",
    height:"50%",
    borderColor:"black",
    borderBottomWidth:0.3,
    flexDirection:"row",
    justifyContent:"center",
    alignItems: "center"
  },
  datemiddle:{
    justifyContent:"center",
    alignItems: "center"
  },
  buttonStyle:{
    width:"10%",
    height:"10%",
    padding: 10,
    margin:5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black"
  }

})
export default DatePicker;
