import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, KeyboardAvoidingView} from 'react-native'
import moment from 'moment'
import ListItem from '../../components/listItem/listItem'
import ButtonWithBackground from '../../UI/ButtonWithBackground'
import DatePicker from '../../UI/DatePicker'
import TimeLine from '../../UI/TimeLine_Backup'
//import EventModal from '../../UI/EventModal'
import EventModal from '../../UI/InfoInputModal/UpdatedModal2/EventModal'
import EventContainer from './EventContainer'
import Colors from '../../../constants/Colors'
import Header from '../../components/Header'
import PanEvent from '../../UI/panEvent'
import LoggingTabs from "../../components/LoggingTabs"
import CircleMenue from '../../components/circleMenue'
import FadeBackground from '../../UI/FadeBackground'
import DeleteConfirmModal from '../../UI/DeleteConfirmModal'


import {connect } from 'react-redux';
import * as eventActions from '../../store/actions/events'

class LoggingScreen extends Component {
    state={
      currentHourBoxes:[],
      ready:false,
      showModal:false,
      showDeleteModal:{
                        status:false,
                        info: null
                        },
      showEvent:false,
      time:{
        date:"",
        currentDay:"",
        currentMonth:"",
        currentHour:""
      },
      dataPicker:{
        length:"",
        qualifier:"",
        description:""
      },
      dropZoneValues:{
        y:100,
        height:50
      },
      lastEvents: [],
      latestCategory:""
  }

  componentDidUpdate(){
    console.log("logging screen updated")
    if(this.props.route.params){
      let {index} = this.props.route.params
      if(index)
      {
        const date = moment().hour(index)//.add(moment().utcOffset(),"m")
        let prevHour = date.clone()
        let nextHour = date.clone()
        let nextDay = date.clone()
        let prevDay = date.clone()
        prevHour = prevHour.subtract(1,"h")
        prevDay = prevDay.subtract(1,"d")
        nextHour = nextHour.add(1,"h")
        nextDay = nextDay.add(1,"d")
        this.setState(prevState =>{
          return{
            ...prevState,
            time:{
              date:date,
              currentDay:date.format("Do"),
              currentMonthN:date.format("M"),
              currentMonth:date.format("MMMM"),
              currentHour:date.format("H"),
              currentYear: date.format("Y"),
              prevDay: prevDay.format("Do"),
              nextDay: nextDay.format("Do"),
              prevHour: prevHour.format("H"),
              nextHour: nextHour.format("H")
            }
          }
        })
        this.props.navigation.setParams({ index: null})
    }
  }
  }
  componentDidMount(){
    const date = moment()//.add(moment().utcOffset(),"m")
    let prevHour = date.clone()
    let nextHour = date.clone()
    let nextDay = date.clone()
    let prevDay = date.clone()
    prevHour = prevHour.subtract(1,"h")
    prevDay = prevDay.subtract(1,"d")
    nextHour = nextHour.add(1,"h")
    nextDay = nextDay.add(1,"d")
    this.setState(prevState =>{
      return{
        ...prevState,
        time:{
          date:date,
          currentDay:date.format("Do"),
          currentMonthN:date.format("M"),
          currentMonth:date.format("MMMM"),
          currentHour:date.format("H"),
          currentYear: date.format("Y"),
          prevDay: prevDay.format("Do"),
          nextDay: nextDay.format("Do"),
          prevHour: prevHour.format("H"),
          nextHour: nextHour.format("H")
        }
      }
    })

  }


  changeTime = (key, direction) =>{
    let date=null
    let prevHour = null
    let nextHour = null
    let nextDay = null
    let prevDay = null
    if(direction ==="front"){
      date = this.state.time.date.add(1,key )
      prevHour = date.clone()
      nextHour = date.clone()
      nextDay = date.clone()
      prevDay = date.clone()
    }
    else{
      date = this.state.time.date.subtract(1,key )
      prevHour = date.clone()
      nextHour = date.clone()
      nextDay = date.clone()
      prevDay = date.clone()
    }

    prevHour = prevHour.subtract(1,"h")
    prevDay = prevDay.subtract(1,"d")
    nextHour = nextHour.add(1,"h")
    nextDay = nextDay.add(1,"d")
    nextDay = nextDay.format("Do")
    //alert(nextDay)
    this.setState(prevState => {
      return{
        ...prevState,
        time:
      { date: date,
        currentDay:date.format("Do"),
        currentMonthN:date.format("M"),
        currentMonth:date.format("MMMM"),
        currentHour:parseInt(date.format("H")) !== 24 ? date.format("H") : 0,
        currentYear: date.format("Y"),
        prevDay: prevDay.format("Do"),
        nextDay: nextDay,
        prevHour: prevHour.format("H"),
        nextHour: nextHour.format("H")
      }
    }
    })
  }
  tellmeStuff = (event) =>{
    let width = event.nativeEvent.layout.width
    let height = event.nativeEvent.layout.height
    this.setState(prevState => {
      return{
      ...prevState,
      screenWidth: width,
      screenHeight: height,
      ready: true
    }
    })
  }


  CancelModal = () =>{
    this.setState(prevState =>{
      return{
        ...prevState,
        showModal:false
      }
    })
  }


  AcceptModal = (duration,tags,description,intensity,fallAsleepDuration, soothingSuccess) =>{
    let qualifier = tags
    let stateInt = intensity
    let stateAsleep = fallAsleepDuration
    let stateSucc = soothingSuccess
    console.log("---------------desc working?", description)
    if(!intensity){
        stateInt = "undefined"
    }
    if(!fallAsleepDuration){
      stateAsleep = "undefined"
    }
    if(soothingSuccess){
      stateSucc = "undefined"
    }

    this.setState(prevState =>{
      return{
        ...prevState,
        showEvent:true,
        showModal:false,
        dataPicker:{
          ...prevState.dataPicker,
          description: description,
          length:duration,
          qualifier: qualifier,
          intensity: intensity,
          fallAsleep:fallAsleepDuration,
          success:soothingSuccess
        }
      }
    })
  }
  OpenModal = (latestCategory)=>{
    if(latestCategory === "Close"){
      this.setState(prevState=>{
        return{
          ...prevState,
           showEvent:false
         }
       })
      }
      else{
    let category = latestCategory
    this.setState(prevState=>{
      return{
        ...prevState,
         showModal:true,
         latestCategory: category
       }
     })}
   }
   setDropZoneValues = (event)=> {
     const theEvent = event.nativeEvent.layout
     this.setState((prevState)=>{
       return{
          ...prevState,
          dropZoneValues:{
            y:theEvent.y + 0.28*Dimensions.get("window").height, //percentages account for top bar and datecontainer
            height:theEvent.height,
            width: theEvent.width
          }
        }})
    }

  resetEvent =( SubtractXCord, xCordTouch ) =>{
    const startTime = this.calcTime(xCordTouch - SubtractXCord)
    const timeStamp = { currentDay: this.state.time.currentDay,
                        currentMonth:this.state.time.currentMonth,
                        currentHour: this.state.time.currentHour,
                        startDateObj:moment({ year :this.state.time.currentYear , month :this.state.time.currentMonthN - 1, day :this.state.time.currentDay,
                                              hour :(parseInt(this.state.time.currentHour)), minute : Math.round(startTime), second :0, millisecond :0}).add(moment().utcOffset(),"m"),
                        endDateObj: moment({ year :this.state.time.currentYear , month :this.state.time.currentMonthN - 1, day :this.state.time.currentDay,
                                    hour :(parseInt(this.state.time.currentHour)), minute : Math.round(startTime), second :0, millisecond :0}).add(moment().utcOffset(),"m").add(this.state.dataPicker.length,"m")                    }

    console.log("reset event",this.state.latestCategory,
    startTime,
    this.state.dataPicker.length,
    this.state.dataPicker.qualifier,
    this.state.dataPicker.intensity,
    this.state.dataPicker.fallAsleep,
    this.state.dataPicker.success,
    this.state.dataPicker.description,
    this.state.screenWidth*0.9*0.08333*(this.state.dataPicker.length/5),
    timeStamp)
    this.props.onAddEvent(
      this.state.latestCategory,
      startTime,
      this.state.dataPicker.length,
      this.state.dataPicker.qualifier,
      this.state.dataPicker.intensity,
      this.state.dataPicker.fallAsleep,
      this.state.dataPicker.success,
      this.state.dataPicker.description,
      this.state.screenWidth*0.9*0.08333*(this.state.dataPicker.length/5),
      timeStamp)
    this.setState(prevState =>{
      return{
        ...prevState,
        dataPicker:{
          length:""
        },
        showEvent:false,
      }
    })
  }
  calcTime = (Cordi) =>{
    // let Xcord = Cordi - this.state.screenWidth*0.9*0.08333*(this.state.dataPicker.length/5

    const BarStart = (Dimensions.get("window").width - this.state.dropZoneValues.width)/2
    const BarEnd = Dimensions.get("window").width - BarStart
    let startTimeinMin = ((Cordi-BarStart)/(BarEnd-BarStart))*60
    return startTimeinMin
  }

  checkOnOptions = () =>{
    alert()
    console.log(JSON.stringify(this.props.events.map(event =>({event}))))
  }
  updateDisplayedBoxes = (boxes) =>{
    this.setState({
      currentHourBoxes: boxes
    })
  }
  onLongEventPress = (id) =>{
    let tempEvent = this.props.events.filter((evt)=>evt.id === id)
    console.log({id:moment(id),
                event: tempEvent})
    this.setState({
      showDeleteModal: {
                        status: true,
                        info: tempEvent
                        }
    })
    //this.props.onDeleteEvent(id)
  }
  hideDeleteModal = () =>{
    this.setState({
      showDeleteModal: {
                        status:false,
                        info: null
                        }
    })
  }
  render(){
    let timeLine = null
    let eventModal = null
    if (this.state.ready){
      timeLine = (
        <TimeLine screenWidth={this.state.screenWidth} screenHeight={this.state.screenHeight}
                  setDropValues={this.setDropZoneValues} time={this.state.time} deleteEvent={this.onLongEventPress}
                  updateBoxes={this.updateDisplayedBoxes} events={this.props.events} />
      )
    }
    if(this.state.showModal){
      eventModal = (
        <EventModal category={this.state.latestCategory} length={this.state.dataPicker.length} onPressCancel={this.CancelModal} onPressAccept={this.AcceptModal}/>
      )
    }
    else{
      eventModal = null
    }
    const deleteConfirmModal = this.state.showDeleteModal.status ? <DeleteConfirmModal onCancel={this.hideDeleteModal} info={this.state.showDeleteModal.info} onDelete={this.props.onDeleteEvent}/> : null
    return(
      <View style={styles.container}>
        {//<FadeBackground />
        }
        <View style={{width:"100%",height:"100%", justifyContent:"center", alignItems:"center"}}>
          <Header backButton={false} title={"Logging"} onClose={this.props.navigation.navigate} onNavigate={this.props.navigation.navigate} events={this.props.events}/>
          <View style = {styles.dateContainer}>
            <DatePicker currentDay={this.state.time.currentDay} currentMonth={this.state.time.currentMonth} currentHour={this.state.time.currentHour}
                        nextDay={this.state.time.nextDay} prevDay={this.state.time.prevDay} nextHour={this.state.time.nextHour} prevHour={this.state.time.prevHour}
            pressChange={this.changeTime} colorTest={"transparent"} date={this.state.time.date}/>
          </View>
          <EventContainer dropZoneValues={this.state.dropZoneValues} onVanish={this.resetEvent} calcTime={this.calcTime} currentHour={this.state.time.currentHour}
            latestCategory={this.state.latestCategory} screenWidth={this.state.screenWidth} dataPickerlength={this.state.dataPicker.length} showEvent={this.state.showEvent}  time={this.state.time} events={this.props.events} color={'transparent'}>
            <View style={styles.logContainer} onLayout={(event) => this.tellmeStuff(event)}>
              {timeLine}
              <View style={{width:'100%', height:'35%'}}/>
            <CircleMenue onSelect={this.OpenModal}/>
            </View>
          </EventContainer>
        </View>
        {eventModal}
        {deleteConfirmModal}
      </View>
    )
  }
}

//<LoggingTabs lastEvents={this.props.events} onSelect={this.OpenModal} style={styles.bottomBar}/>

// LoggingScreen.navigationOptions = navData =>{
//   return{
//   tabBarVisible:True
// }
// }


let Window = Dimensions.get("window")

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems: "center",
    backgroundColor:'#fff',
    zIndex:1
  },
  dateContainer:{
    width:"100%",
    height:"20%",
    justifyContent:"center",
    alignItems: "center"
  },
  logContainer:{
    width:"100%",
    //height:"64%",
    height:"100%",

  },

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

export default connect(mapStateToProps, mapDispatchToProps) (LoggingScreen);
