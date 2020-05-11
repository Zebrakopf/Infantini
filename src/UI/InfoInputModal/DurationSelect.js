import React, {useState} from 'react'
import {View, ScrollView, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ButtonWithBackground from '../ButtonWithBackground'


//Zeros on the select screen are not always centered on every screenWidth

const {height, width} = Dimensions.get("window")
const boxHeight = height*0.5
const boxWidth = width*0.5

const DurationSelect = props =>{
  const [directionConf, setDirectionConf] = useState(null)
  const [xHours,setXHours] = useState(0)
  const [xMinutes,setXMinutes] = useState(0)
  const [descriptionInput,setDescription] = useState("")
  const lengthsMinutes = [0,5,10,15,20,25,30,35,40,45,50,55,60]
  const elementsMinutes = lengthsMinutes.map(x => <TouchableOpacity key={x} style={styles.item}>
                                    <Text style={styles.text}>{x < 10 ? String(0)+String(x) : x}</Text>
                                  </TouchableOpacity>)
  const lengthsHours = [0,1,2,3,4,5,6,7,8,9,10,11,12]
  const elementsHours = lengthsHours.map(x => <TouchableOpacity key={x} style={styles.item}>
                                    <Text style={styles.text}>{x < 10 ? String(0)+String(x) : x}</Text>
                                  </TouchableOpacity>)

  const moveTime = (buttonID, yCords) =>{

    let scroll= 0
    switch (buttonID){
      case "HoursDown":
        scroll = xHours - boxHeight*0.3
        if(xHours !== 0){
        setXHours(scroll)
        scrollerHoursRef.scrollTo({x:0,y:scroll})}
      break;
      case "HoursUp":
        scroll = xHours + boxHeight*0.3
        if(xHours < (boxHeight*0.3)*lengthsHours.length){
        setXHours(scroll)
        scrollerHoursRef.scrollTo({x:0,y:scroll})}
      break;
      case "MinutesDown":
        scroll = xMinutes - boxHeight*0.3
        if(xMinutes !== 0){
        setXMinutes(scroll)
        scrollerMinutesRef.scrollTo({x:0,y:scroll})}
      break;
      case "MinutesUp":
        scroll = xMinutes + boxHeight*0.3
        if(xMinutes < (boxHeight*0.3)*lengthsMinutes.length){
        setXMinutes(scroll)
        scrollerMinutesRef.scrollTo({x:0,y:scroll})}
      break;
      case "userScrollMinutes":
        setXMinutes(yCords)
      break;
      case "userScrollHours":
        setXHours(yCords)
      break;

    }
    props.onChangeDuration(readTime)
  }
  const readTime = () =>{
    let hours = 0
    let minutes = 0
    if (xHours !== 0){
      hours = lengthsHours[(Math.round(xHours/(boxHeight*0.3)))]
    }
    if (xMinutes !== 0){
      minutes = lengthsMinutes[Math.round((xMinutes/(boxHeight*0.3)))]
    }
    var duration = hours*60 + minutes
    return (
      duration
     )
  }
  const configureArrowDirection = (firstDirection,hourOrMinute) =>{
    if (directionConf === null){
      firstDirection ==="UpIsUp" ? setDirectionConf("UpIsUp") : setDirectionConf("DownIsDown")

      return hourOrMinute === "hour" ? moveTime("HoursUp"):moveTime("MinutesUp")
    }
    let direction = firstDirection
    if(directionConf === direction){
      hourOrMinute === "hour" ? moveTime("HoursUp"):moveTime("MinutesUp")

    }
    else{
      hourOrMinute === "hour" ? moveTime("HoursDown"):moveTime("MinutesDown")
    }
  }
  return(
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
        <ButtonWithBackground style={styles.arrowContainer} onPress={()=>{configureArrowDirection("UpIsUp","hour")}}>
          <Icon name={"ios-arrow-up"} size={40} color={"black"}/>
        </ButtonWithBackground>
        <ScrollView contentContainerStyle={{alignItems:"center",justifyContent:"center"}} snapToInterval={boxHeight*0.3} ref={(scroller)=>{scrollerHoursRef=scroller}} onScroll={(event)=> {moveTime("userScrollHours", event.nativeEvent.contentOffset.y)}}>
          {elementsHours}
        </ScrollView>
        <ButtonWithBackground style={styles.arrowContainer} onPress={()=>{configureArrowDirection("DownIsDown","hour")}}>
          <Icon name={"ios-arrow-down"} size={40} color={"black"}/>
        </ButtonWithBackground>
      </View>
      <View style={styles.seperator}>
        <Text style={styles.seperatorText}>:</Text>
      </View>
      <View style={styles.selectorContainer}>
      <ButtonWithBackground style={styles.arrowContainer} onPress={()=>{configureArrowDirection("UpIsUp","minutes")}}>
          <Icon name={"ios-arrow-up"} size={40} color={"black"}/>
        </ButtonWithBackground>
        <ScrollView contentContainerStyle={{alignItems:"center",justifyContent:"center"}} snapToInterval={boxHeight*0.3} ref={(scroller)=>{scrollerMinutesRef=scroller}} onScroll={(event)=> {moveTime("userScrollMinutes", event.nativeEvent.contentOffset.y)}}>
          {elementsMinutes}
        </ScrollView>
        <ButtonWithBackground style={styles.arrowContainer} onPress={() => {configureArrowDirection("DownIsDown","minutes")}}>
          <Icon name={"ios-arrow-down"} size={40} color={"black"}/>
        </ButtonWithBackground>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    width:boxHeight*0.7,
    height:boxWidth*0.7,
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row"
  },
  selectorContainer:{
    height:"100%",
    width:"40%",
    justifyContent:'center',
  },
  arrowContainer:{
    height:"15%",
    width:"100%",
    alignItems:"center",
    justifyContent:"center"
  },
  seperator:{
    height:"100%",
    width:"20%",
    alignItems:"center",
    justifyContent:"center"
  },
  seperatorText:{

      fontSize:30
  },
  item:{
    alignItems:"center",
    justifyContent:"center",
    height:boxHeight*0.3,
    width:"90%",
  },
  text:{
    fontSize:30
  }
})

export default DurationSelect
