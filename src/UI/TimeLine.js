import React, {Component} from 'react'
import {connect} from 'react-redux'

import {View, StyleSheet} from 'react-native'
import TimeLineBox from './TimeLineBox'
import CalcTimeLineBox from './calcTimeLineBox'
import Colors from '../../constants/EventColors'
import Icon from 'react-native-vector-icons/Ionicons';

const selectBoxes = (evt, currentHour) =>{
  let eventLength = evt.duration/60
  let duration = evt.duration
  let evtHour = evt.timeStamp.currentHour
  if (currentHour === evtHour){
    return {duration: duration, id: evt.id, startTime: evt.startTime}
  }
  else if(currentHour >= evtHour){
    let timeDif = currentHour - evtHour
    if (timeDif >= 1){
      return {duration: 60, id: evt.id, startTime: 0}
    }
    else{
      duration = duration + evt.startTime - timeDif*60
      return {duration: duration, id: evt.id, startTime: 0}
    }
  }
}

class TimeLine extends Component{

  render(){
    let boxesCry = null
    let boxesSleep = null
    let boxesFood = null
    let boxesSoothing = null
    let prevBoxesSoothing = null
    let prevBoxesCry = null
    let prevBoxesSleep = null
    let prevBoxesFood = null

  const timeBoxes = this.props.events.filter(evt => (evt.timeStamp.currentHour === this.props.time.currentHour && evt.timeStamp.currentDay === this.props.time.currentDay && evt.timeStamp.currentMonth === this.props.time.currentMonth))
  const prevTimeBoxes = this.props.events.filter(evt => (evt.timeStamp.currentHour === this.props.time.prevHour && evt.timeStamp.currentDay === this.props.time.currentDay && evt.timeStamp.currentMonth === this.props.time.currentMonth))

    if (timeBoxes.length!==0){)
      boxesCry = timeBoxes.map(obj => {
        if(obj.category === "Cry")
        {return(
          <CalcTimeLineBox Size={obj.size} duration={obj.duration} key={obj.id}  Position={obj.startTime} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.cry.grumpy} titleText={"cry"}/>
        )}
      })
      boxesSoothing = timeBoxes.map(obj => {
        if(obj.category === "Soothing")
        {return(
          <TimeLineBox Size={obj.size} key={obj.id} id ={obj.id} Position={obj.startTime} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.soothing} titleText={"Soothing"}/>
        )}
      })
      boxesSleep = timeBoxes.map(obj => {
        if(obj.category === "Sleep")
        {return(
          <TimeLineBox Size={obj.size} key={obj.id} id ={obj.id} Position={obj.startTime} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.sleep} titleText={"Sleep"}/>
        )}
      })
      boxesFood = timeBoxes.map(obj => {
        if(obj.category === "Food")
        {return(
          <View style={{height:"100%", width:15, marginLeft:obj.startTime/60*(this.props.screenWidth*0.9),}}>
            <Icon name={"md-restaurant"} size={15} color={"black"}/>
          </View>
        )}
      })
    }
    if (prevTimeBoxes.length!==0){
      prevBoxesCry = prevTimeBoxes.map(obj => {
        if(obj.end > 60){
        if(obj.category === "Cry")
        {return(
          <TimeLineBox Size={obj.size / (obj.duration/5) * ((obj.end-60)/5)} key={obj.id} Position={0} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.cry.grumpy} titleText={"Cry"}/>
        )}}
      })
      prevBoxesSleep = prevTimeBoxes.map(obj => {
        if(obj.end > 60){
        if(obj.category === "Sleep")
        {return(
          <TimeLineBox Size={obj.size / (obj.duration/5) * ((obj.end-60)/5)} key={obj.id} Position={0} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.sleep} titleText={"Sleep"}/>
        )}}
      })
      prevBoxesSoothing = timeBoxes.map(obj => {
        if(obj.end > 60){
        if(obj.category === "Soothing")
        {return(
          <TimeLineBox Size={obj.size / (obj.duration/5) * ((obj.end-60)/5)} key={obj.id} Position={0} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.soothing} titleText={"Soothing"}/>
        )}}
      })}
    return(
    <View onLayout={this.props.setDropValues} style={[{backgroundColor:"#eee", width:this.props.screenWidth*0.9,flexDirection:"row", borderWidth:1, borderRadius:3, borderColor:"black", elevation:2,
    height:this.props.screenHeight*0.2,marginTop: this.props.screenHeight*0.05, marginLeft:this.props.screenWidth*0.05, marginRight:this.props.screenWidth*0.05 }]}>
      <View style={[, styles.dashesContainer,{borderLeftWidth:1, borderColor:"#eee"}]}>
      </View>
      <View style={styles.dashesContainer}>
      </View>
      <View style={[styles.dashesContainer,{borderLeftWidth:2, borderRightWidth:0,}]}>
      </View>
      <View style={styles.dashesContainer}>
      </View>
      <View style={[styles.dashesContainer,{borderLeftWidth:2, borderRightWidth:0,}]}>
      </View>
      <View style={styles.dashesContainer}>
      </View>
      <View style={[styles.dashesContainer,{borderLeftWidth:3, borderRightWidth:0,}]}>
      </View>
      <View style={styles.dashesContainer}>
      </View>
      <View style={[styles.dashesContainer,{borderLeftWidth:2, borderRightWidth:0,}]}>
      </View>
      <View style={styles.dashesContainer}>
      </View>
      <View style={[styles.dashesContainer,{borderLeftWidth:2, borderRightWidth:0,}]}>
      </View>
      <View style={[styles.dashesContainer,{borderRightWidth:1, borderRightWidth:0,}]}>
      </View>
      <View style={[{width:"100%", height:"80%",marginTop:this.props.screenHeight*0.2*0.1, position: "absolute", backgroundColor:"#eee"}]}>
        <View style={styles.rowBoxes}>{boxesCry}{boxesSleep}{prevBoxesCry}{prevBoxesSleep}</View>
        <View style={styles.rowBoxes}>{boxesSoothing}{prevBoxesSoothing}</View>
        <View style={styles.rowBoxes}>{boxesFood}{prevBoxesFood}</View>
      </View>
    </View>
  )


  }
}

const styles = StyleSheet.create({
  dashesContainer:{
    width:"8.333333%",
    height:"100%",
    borderLeftWidth:1,
    borderColor:"black",
  },
  rowBoxes:{
    width:"100%",
    height:"33%",
    flexDirection:"row",
    alignItems:"flex-start",
    overflow:"hidden"

  },

})

const mapStateToProps = state => {
  return {
    events: state.events.allEvents
  }
}

export default connect(mapStateToProps)(TimeLine)
