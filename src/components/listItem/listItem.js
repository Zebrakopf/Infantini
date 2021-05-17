import React, {useState, useEffect} from'react';
import {View, Text, StyleSheet, TouchableOpacity, Image,} from 'react-native';
import Colors from '../../../constants/Colors'
import EventColors from '../../../constants/EventColors'
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment'


const N_CIRCLES_PER_ROW = 5

const listItem = (props) => {
  const currentDate = moment()


  const [myTimeStart,changemyTimeStart] = useState(props.time.clone().subtract(23 - props.index,'h'))
  const [myTimeEnd,changemyTimeEnd] = useState(myTimeStart.clone().add(1,'h'))
  const [eventCircles, handleEventsCircles] = useState([])
    const [firstRender, handleFirstRender] = useState(true)




  useEffect(()=>{
    //console.log("rerender lstItem", props.index)
    if(!firstRender){// timeBoxes are only evaluated on second render so that the list can build up quicklu once the app is loaded
      const timeBoxesRaw = props.events.filter(evt => moment(evt.timeStamp.startDateObj).isBetween(myTimeStart, myTimeEnd) ||  moment(evt.timeStamp.endDateObj).isBetween(myTimeStart, myTimeEnd) || ( moment(evt.timeStamp.startDateObj).isBefore(myTimeStart) &&  moment(evt.timeStamp.endDateObj).isAfter(myTimeEnd)) || ( moment(evt.timeStamp.startDateObj).isSame(myTimeStart) &&  moment(evt.timeStamp.endDateObj).isSame(myTimeEnd)))
    if(timeBoxesRaw.length){

      handleEventsCircles(determineCircles(timeBoxesRaw))
    }

    if(!timeBoxesRaw.length){
      handleEventsCircles([])
    }}
    else{
      handleFirstRender(false)
    }
  },[props.events,firstRender])

  const determineCircle = (category) =>{
    switch(category){
      case "Cry":
        return (<View style={[styles.eventCircle,{backgroundColor:EventColors.cry.grumpy}]} key={Math.random()} />)
      case "Sleep":
        return (<View style={[styles.eventCircle,{backgroundColor:EventColors.sleep}]} key={Math.random()} />)
        break;
      case "Food":
        return (<View style={[styles.eventCircle,{backgroundColor:EventColors.food}]} key={Math.random()}/>)
        break;
      case "Soothing":
        return (<View style={[styles.eventCircle,{backgroundColor:EventColors.soothing}]} key={Math.random()}/>)
        break;
      case "Diapers":
        return (<View style={[styles.eventCircle,{backgroundColor:EventColors.diaper}]} key={Math.random()}/>)
        break;
      case "Positives":
        return (<View style={[styles.eventCircle,{backgroundColor:EventColors.positives}]}key={Math.random()} />)
        break;
    }
    return null
  }
  const determineCircles = (timeBoxesRaw) =>{
    let tempArray = []
    if (timeBoxesRaw.length){
      tempArray = timeBoxesRaw.map((evt)=>{return determineCircle(evt.category)})
    }
    return tempArray
  }
//console.log('redirect to logging ' + currentDateStart.format("LLL") + ' end: '+ currentDateEnd.format("LT"), timeBoxesRaw)\
  return(
  <TouchableOpacity style={styles.container}onPress={() => {props.onPress(myTimeStart.clone().subtract(moment().utcOffset(),'m'))}}>
    <View style={styles.listItem}>
      <View style={styles.circle}>
        {<Icon name={'ios-add'} size={70} color={'black'}/>}
      </View>
      <View style={styles.lineContainer}>
        <View style={styles.eventContainer}>
          {eventCircles.map((evt,idx)=>{return(idx <= N_CIRCLES_PER_ROW ? evt : null)})}
        </View>
        <View style={styles.line}/>
        <View style={styles.eventContainer}>
          {eventCircles.map((evt,idx)=>{return(idx > N_CIRCLES_PER_ROW ? evt : null)})}
        </View>
      </View>
      <Text style={styles.textTime}>{ myTimeStart.clone().subtract(moment().utcOffset(),'m').format('HH:mm')} - {myTimeEnd.clone().subtract(moment().utcOffset(),'m').format("HH:mm")}</Text>
    </View>
    {props.index != 23 ? <View style={styles.verticalLine}/> : null}
  </TouchableOpacity>
)};

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:80
  },
  listItem: {
    width:"100%",
    padding: 5,
    //backgroundColor: "#eee",
    marginBottom: 3,
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
    borderRadius:5,
    borderWidth:1,
    borderColor:"#eee",
    elevation:0
  },
  circle:{
    height:50,
    width:50,
    borderWidth:2,
    borderColor:Colors.compound,
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center',
  },
  lineContainer:{
    width:'45%',
    height:"100%",
    marginLeft:10,
    marginRight:10,
    alignItems:'center',
    justifyContent:'flex-start'
  },
  line:{
    width:'100%',
    height:2,
    backgroundColor:Colors.compound,
    marginLeft:10,
    marginRight:10,
    marginTop:"2.5%",
    marginBottom:"2.5%",
  },
  eventContainer:{
    width:'90%',
    height:'35%',
    //backgroundColor:Colors.compound,
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'flex-start'
  },
  eventCircle:{
    margin:1  ,
    width:20,
    height:20,
    borderRadius:100
  },
  verticalLine:{
    width:2,
    height:10,
    marginLeft:30,
    backgroundColor:'#eee'
  },
  textTime:{
    color:Colors.compound,
    fontWeight:'bold'
  }

});

export default listItem;
