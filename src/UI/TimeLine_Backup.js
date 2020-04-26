import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {View,Text, StyleSheet} from 'react-native'
import TimeLineBox from './TimeLineBox'
import CalcTimeLineBox from './calcTimeLineBox'
import Colors from '../../constants/EventColors'
import Icon from 'react-native-vector-icons/Ionicons';
import * as scale from 'd3-scale'




const selectBoxes = (evt, currentDateStart, currentDateEnd) =>{
  let duration = evt.duration
  if ( moment(evt.timeStamp.startDateObj).isBetween(currentDateStart, currentDateEnd) &&  moment(evt.timeStamp.endDateObj).isBetween(currentDateStart, currentDateEnd)){
      //event starts and ends within this hour
      return ({duration: duration, id: evt.id, startTime: evt.startTime, category: evt.category, qualifier: evt.qualifier})
  }
  if (moment(evt.timeStamp.endDateObj).isBetween(currentDateStart, currentDateEnd)){
    //event starts before this hour and end in this hour
    duration = moment(evt.timeStamp.endDateObj).diff(moment(currentDateStart),'minutes')
    return ({duration: duration, id: evt.id, startTime: 0, category: evt.category, qualifier: evt.qualifie})
  }
  if(moment(evt.timeStamp.startDateObj).isBetween(currentDateStart, currentDateEnd)){
    //event starts in the hour but ends after
    duration = currentDateEnd.diff(moment(evt.timeStamp.startDateObj),'minutes')
    return ({duration: duration, id: evt.id, startTime: evt.startTime, category: evt.category, qualifier: evt.qualifie})
    }
  if(moment(evt.timeStamp.startDateObj).isBefore(currentDateStart) &&  moment(evt.timeStamp.endDateObj).isAfter(currentDateEnd)){
    // event starts before and ends after hour
      return ({duration: 60, id: evt.id, startTime: 0, category: evt.category, qualifier: evt.qualifie})
    }
  }



class TimeLine extends Component{
  constructor(props){
    super(props)
    this.state ={
      boxesCry:null,
      boxesSleep:null,
      boxesMoment:null,
      boxesSoothing:null,
      timeBoxes:[],
      lastHour:null
    }
  }

  componentDidMount(){
    let currentDate = this.props.time.date.clone()
    const currentDateStart = moment({ year : currentDate.get('year') , month : currentDate.get('month'), day : this.props.time.currentDay,
                          hour :currentDate.get('hour'), minute : 0, second :0, millisecond :0}).add(moment().utcOffset(),"m")
    const currentDateEnd = currentDateStart.clone().add(1,'h')
    this.setState({
      lastHour:0,
      lastDay:0,
      currentStart:currentDateStart,
      currentEnd:currentDateEnd,
    })
  }
  componentDidUpdate(previousProps, previousState){
    let selectedBox = 0
    if(this.props.selectedEvent.info){
      selectedBox = this.props.selectedEvent.info[0].id
    }
    const  timeScale = scale.scaleTime()
                     .domain([this.props.time.date.clone().add(moment().utcOffset(),"m").toDate(),this.props.time.date.clone().add(moment().utcOffset(),"m").add(1,'h').toDate()])
                     .range([0,this.props.screenWidth*0.9])

      let boxesCry = null
      let boxesSleep = null
      let boxesMoment = null
      let boxesSoothing = null
    let currentDate = this.props.time.date.clone()
    const currentDateStart = moment({ year : currentDate.get('year') , month : currentDate.get('month'), day : this.props.time.currentDay,
                          hour :currentDate.get('hour'), minute : 0, second :0, millisecond :0}).add(moment().utcOffset(),"m")
    const currentDateEnd = currentDateStart.clone().add(1,'h')
    const timeBoxesRaw = this.props.events.filter(evt => moment(evt.timeStamp.startDateObj).isBetween(currentDateStart, currentDateEnd) ||  moment(evt.timeStamp.endDateObj).isBetween(currentDateStart, currentDateEnd) || ( moment(evt.timeStamp.startDateObj).isBefore(currentDateStart) &&  moment(evt.timeStamp.endDateObj).isAfter(currentDateEnd)))


    //const timeBoxes = timeBoxesDay.map(obj =>{return(selectBoxes(obj, this.props.time.currentHour))})
    const timeBoxes = timeBoxesRaw.map(obj =>{return(selectBoxes(obj, currentDateStart, currentDateEnd))})

      if (timeBoxes.length!==0){
        boxesCry = timeBoxes.map(obj => {
          if(obj.category === "Cry")
          {return(
            <CalcTimeLineBox duration={obj.duration} key={obj.id} id ={obj.id} Position={obj.startTime} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.cry.grumpy} titleText={"cry"} deleteEvent={this.props.deleteEvent} selected={selectedBox}/>
          )}
        })
        boxesSoothing = timeBoxes.map(obj => {
          if(obj.category === "Soothing")
          {return(
            <CalcTimeLineBox  duration={obj.duration} key={obj.id} id ={obj.id} Position={obj.startTime} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.soothing} titleText={"Soothing"} deleteEvent={this.props.deleteEvent} selected={selectedBox}/>
          )}
        })
        boxesSleep = timeBoxes.map(obj => {
          if(obj.category === "Sleep")
          {return(
            <CalcTimeLineBox  duration={obj.duration} key={obj.id} id ={obj.id} Position={obj.startTime} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.sleep} titleText={"Sleep"} deleteEvent={this.props.deleteEvent} selected={selectedBox}/>
          )}
        })
        boxesMoment = timeBoxes.map(obj => {
          if(obj.category === "Food")
          {return(
            <CalcTimeLineBox duration={5} key={obj.id} id ={obj.id} Position={obj.startTime} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.food} titleText={""} deleteEvent={this.props.deleteEvent} selected={selectedBox}/>
          )}
          if(obj.category === "Positives")
          {return(
            <CalcTimeLineBox duration={5} key={obj.id} id ={obj.id} Position={obj.startTime} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.positives} titleText={""} deleteEvent={this.props.deleteEvent} selected={selectedBox}/>
          )}
          if(obj.category === "Diapers")
          {return(
            <CalcTimeLineBox duration={5} key={obj.id} id ={obj.id} Position={obj.startTime} dropZoneWidth={this.props.screenWidth*0.9} dropZoneHeight={this.props.screenHeight*0.2} boxColor={Colors.diaper} titleText={""} deleteEvent={this.props.deleteEvent} selected={selectedBox}/>
          )}
        })

        if(timeBoxes.length !== previousState.timeBoxes.length || (previousState.selectedBox !== selectedBox)){
          this.setState({
            selectedBox:selectedBox,
            boxesCry:boxesCry,
            boxesSleep:boxesSleep,
            boxesMoment:boxesMoment,
            boxesSoothing:boxesSoothing,
            timeBoxes:timeBoxes,
            currentStart:currentDateStart,
            currentEnd:currentDateEnd,
          })
        }
      }
      if(currentDate.get('hour') !== previousState.lastHour || currentDate.get('date') !== previousState.lastDay || (!timeBoxes.length && previousState.timeBoxes.length === 1)){

        this.setState({
          selectedBox:selectedBox,
          boxesCry:boxesCry,
          boxesSleep:boxesSleep,
          boxesMoment:boxesMoment,
          boxesSoothing:boxesSoothing,
          timeBoxes:timeBoxes,
          lastHour:currentDate.get('hour'),
          lastDay:currentDate.get('date'),
          currentStart:currentDateStart,
          currentEnd:currentDateEnd,
        })
        this.props.updateBoxes(timeBoxes)
      }

  }


  render(){

    return(
    <View onLayout={this.props.setDropValues} style={[{backgroundColor:"#fff", width:this.props.screenWidth*0.9,flexDirection:"row", borderWidth:1, borderRadius:3, borderColor:"black", elevation:3,
    height:this.props.screenHeight*0.2,marginTop: this.props.screenHeight*0.10, marginLeft:this.props.screenWidth*0.05, marginRight:this.props.screenWidth*0.05 }]}>
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
      <View style={[{width:"100%", height:"80%",marginTop:this.props.screenHeight*0.2*0.1, position: "absolute", backgroundColor:"#fff"}]}>
        <View style={styles.rowBoxes}>{this.state.boxesCry}{this.state.boxesSleep}</View>
        <View style={styles.rowBoxes}>{this.state.boxesSoothing}</View>
        <View style={styles.rowBoxes}>{this.state.boxesMoment}</View>
      </View>
      <View style={{width:this.props.screenWidth*0.10,height:this.props.screenWidth*0.10,position:'absolute', top:this.props.screenHeight*0.2, right:this.props.screenWidth*0.9-(this.props.screenWidth*0.11)/2, alignItems:'center'}}>
      <View style={{width:1, height:10, backgroundColor:'black'}}>
      </View>
        <Text style={{fontSize:10}}>{this.state.currentStart ? this.state.currentStart.clone().subtract(moment().utcOffset(),'m').format('HH:mm') : this.state.lastHour}</Text>
      </View>

      <View style={{width:this.props.screenWidth*0.10,height:this.props.screenWidth*0.10,position:'absolute', top:this.props.screenHeight*0.2, left:this.props.screenWidth*0.9-(this.props.screenWidth*0.11)/2, alignItems:'center'}}>
      <View style={{width:1, height:10, backgroundColor:'black'}}>
      </View>
        <Text style={{fontSize:10}}>{this.state.currentEnd ? this.state.currentEnd.clone().subtract(moment().utcOffset(),'m').format('HH:mm') : this.state.lastDay}</Text>
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


export default TimeLine
