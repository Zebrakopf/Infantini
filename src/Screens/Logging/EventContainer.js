import React, {Component} from "react"
import {View, StyleSheet, Dimensions, Text, TouchableOpacity} from "react-native"
import PanEvent from '../../UI/panEvent'
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../../constants/Colors'
import LoggingTabs from '../../components/LoggingRing'
import CircleMenue from '../../components/circleMenue'




class EventContainer extends Component{

  state={
    infoTime:"",
    currentHour:"",
    category:"",
    showInfo:false,
    showLoggingTabs:false,
  }

  showTimeHandler = (SubtractXCord, xCordTouch) => {
    let startTime = Math.round(this.props.calcTime(xCordTouch - SubtractXCord))
    let endTime = Math.round(Number(startTime) + Number(this.props.dataPickerlength))
    if (endTime > 60){
      let addedHours = Math.trunc(endTime/60)
      let currentHour = Number(this.props.currentHour) + addedHours
      currentHour = currentHour > 24 ? currentHour - 24 : currentHour
      endTime = endTime-addedHours*60
      if (endTime < 10){
        console.log(startTime, " last else ",endTime)

        endTime = "0" + endTime
      }
      endTime = currentHour + ":" + endTime
      if (startTime < 10){
        startTime = "0" + startTime
      }
    }
    else{
      if (endTime < 10){
        endTime = "0" + endTime
      }
      if (startTime < 10){
        startTime = "0" + startTime
      }
      if(endTime == 60){
        let currentHour = Number(this.props.currentHour) + 1
        endTime = currentHour+":00"
      }
      else{
       endTime = this.props.currentHour+":"+endTime
      }
    }
    this.setState({
      currentHour: this.props.currentHour,
      infoTime: startTime,
      category: this.props.latestCategory,
      endTime: endTime,
      showInfo: true,
    })
  }
  makeInfoDisappear = () =>{
    this.setState({
      showInfo:false
    })
  }

  render(){
    let eventBox = null
    let showInfo = null
    let loggingTabs = null
    if(this.props.showEvent){
      eventBox = (<PanEvent Size ={this.props.screenWidth*0.9*0.08333*(this.props.dataPickerlength/5)} tooBig={this.props.dataPickerlength < 60} infoHandler={this.showTimeHandler} infoDisapper={this.makeInfoDisappear} dropZoneValues={this.props.dropZoneValues} onVanish={this.props.onVanish} latestCategory={this.props.latestCategory}/>)

    }
    if(this.state.showInfo){
      showInfo = <View style={styles.infoContainer}><Text>{this.state.category} from {this.state.currentHour}:{this.state.infoTime} till {this.state.endTime}</Text></View>
    }
    if(this.state.showLoggingTabs){
      loggingTabs = <LoggingTabs lastEvents={this.props.events} onSelect={this.OpenModal} style={styles.bottomBar}/>
    }
    return (
      <View style={{flex:1, height:"100%", width:"100%", backgroundColor:"#fff", justifyContent:"center", alignItems: "center"}}>
        {this.props.children}
        {eventBox}
        {showInfo}
        {loggingTabs}
      </View>)
  }

}

let Window = Dimensions.get("window")

const styles = StyleSheet.create(
  {
    eventContainer:{
      width:"100%",
      height:"50%",
      position:"absolute",
      marginTop:Window.height*0.2,
      justifyContent:"center",
      alignItems: "center",
      backgroundColor:"black"

    },
    infoContainer:{
      justifyContent:"center",
      alignItems: "center",
      width:"100%",
      height:"40%",
      position:"absolute"
    },
    addButton:{
      height:60,
      width:60,
      borderRadius:30,
      //alignSelf:"flex-end",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:Colors.primary,
      elevation:3
      //position:'absolute'
    },
    addButtonContainer:{
      height:60,
      width:'100%',
      justifyContent:"center",
      alignItems:"center",
      //marginBottom:"5%",
      backgroundColor:'#fff',
      position:'absolute',
      top:Window.height*0.53
    },
     bottomBar:{
       width:"100%",
       height:"9%",
       //backgroundColor:"#86cce3",
       backgroundColor:Colors.primary,

    },
  }
)

export default EventContainer;
