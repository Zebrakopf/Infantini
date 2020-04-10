import React, {useEffect, useState} from'react'
import {View,Text,TouchableOpacity,ScrollView, TextInput, Dimensions,StyleSheet,Easing,Animated,Keyboard} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Moment from 'moment';
import RangeInput from './RangeInput'
import Colors from '../../../constants/Colors'
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment);

//let calDay = moment({day:1})
let firstRender = true
const ITEMHEIGHT = 25
const DateRangeInput = ({route, navigation}) =>{

   DateRangeInput.navigationOptions = {
    cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: 'clamp',
              }),
            },
          }),
  };

  const { Range } = route.params;
  const { pushSelection } = route.params;
  const [dateInfo,changeDate] = useState(moment({day:1,Hour:12}))
  const [renderDropDownStatus, changeDropDownStatus] = useState(false)
  const [showRangeStatus, changeRangeStatus] = useState(Range)
  const [selectedDate,changeSelectedDate] = useState(null)
  const [selectedDate2,changeSelectedDate2] = useState(null)
  const [selectedRange,changeSelectedRange] = useState(null)
  const [animatedValue,changeAnim] = useState(new Animated.Value(0))
  useEffect(()=>{
    changeMonthSelectorPos(dateInfo.month())

  },[])

  const renderFields = (row,dateObj) =>{
    let calDay = dateObj

    let ms = Math.abs(dateInfo.clone().diff( dateInfo.clone().add(1,'month'), 'days'))
    // console.log('days of month ',dateObj.month(),' ',ms)
    let weekDays = ['Mo','Tu','We','Th','Fr','Sa','Su']
    let firstField = dateInfo.day() === 0 ? 7 : dateInfo.day()

    return weekDays.map((day,idx)=>{
      if(row===0){
        return(
          <View key={row===0 ? day : fieldIdx} style={[styles.field,{marginRight:idx=== 6 ? 0 : 4}]} >
            <Text style={{fontSize:14, color:'#a1a1a1',textAlign:"center", width:"100%"}}>
              {day }

            </Text>
          </View>
        )
      }

      let fieldIdx = (idx+1) + (( row - 1 ) * 7)
      let dayNr = calDay.date()
      let fieldDate = null
      // console.log('new:  ',calDay,dayNr, fieldIdx, ms)
      if(fieldIdx > firstField - 1){
        dayNr = calDay.date()
        calDay.add(1,'day')
         fieldDate = calDay.clone().subtract(1,'day').toDate()
      }else{
        dayNr = calDay.clone().subtract(Math.abs(firstField - fieldIdx),'days').date()
         fieldDate = calDay.clone().subtract(Math.abs(firstField - fieldIdx),'days').toDate()
      }

      let selected = selectedRange ? selectedRange.contains(fieldDate) : moment(selectedDate).isSame(moment(fieldDate),'day')
      //console.log("-------selection Bug",selectedDate,fieldDate, moment(selectedDate).isSame(moment(fieldDate),'day'))
      return(
        <TouchableOpacity key={fieldIdx} style={[styles.field,{marginRight:idx=== 6 ? 0 : 4}]} onPress={()=>{handleDateSelection(fieldDate)}}>
          <View style={[styles.field,{backgroundColor: selected ? Colors.primary : 'transparent', width:36,height:36,borderRadius:100}]}>
          <Text style={{fontSize:14, color:(fieldIdx - firstField + 1 > ms || fieldIdx < firstField ) ? '#a1a1a1' : selected ? 'white' : 'black',textAlign:"center", width:"100%"}}>
            { dayNr }

          </Text>
          </View>
        </TouchableOpacity>
      )
    })
  }
  const renderRows = (dateObj) =>{
    let rows = [0,1,2,3,4,5,6]
    return rows.map((row)=>{
      return(
        <View key={row} style={styles.weekRow}>
          {renderFields(row,dateObj)}
        </View>
      )
    })
  }

  const renderDropDown = () => {
    let months = ['January', 'February', 'March','April', 'May', 'June','July', 'August', 'September','October', 'November', 'December']
    let selectedIdx = dateInfo.month()
    //changeMonthSelectorPos(dateInfo.date()+1)
    return (
      <View style={{width:124, height:ITEMHEIGHT * 12 + 8, padding:4, position:"absolute", top:40,left:24,backgroundColor:'#fff' ,zIndex:2,elevation:1}}>
        <Animated.View style={{width:110, height:ITEMHEIGHT, borderRadius:10,backgroundColor:Colors.primary,position:"absolute",zIndex:2,left:5, top:animMonthSelectorPos }}></Animated.View>
        {months.map((month, idx)=>{
          return(
            <TouchableOpacity key={month} style={{width:120,height:ITEMHEIGHT, zIndex:3}} onPress={()=>{changeComponentDate(moment({month:idx,day:1, hour: 12}),idx)}}>
              <Text style={{width:120,height:ITEMHEIGHT, padding:2,paddingLeft:8, color: idx === selectedIdx ? '#fff' : 'black'}}>{month}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }
  const animMonthSelectorPos =  animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [4,ITEMHEIGHT*12 + 4], //when animated value is 1, the subcategory container will be equal to the number of links * each links height
  })
  const changeMonthSelectorPos = (listY) => {
    let newPos = (1/12) * listY
    Animated.timing(animatedValue, { //animating this value from zero to one will update the subcategory container height, which interpolates this value
      toValue: newPos,
      duration: 800,
      easing: Easing.inOut(Easing.quad),
    }).start(() => {console.log(animMonthSelectorPos)})
  }

  const changeComponentDate = (newDate,monthIdx) =>{
    changeDate(newDate)

    if(monthIdx >=0)
    {
      changeMonthSelectorPos(monthIdx)
    }
    else {

            changeMonthSelectorPos(newDate.month())
    }
  }
  const handleDateSelection = (date) =>{
    //console.log("handleSelection: ", date, selectedDate, moment(selectedDate).isSame(moment(date),'day'))
    let firstDate = selectedDate
    let secondDate= selectedDate2
    let range = selectedRange
    if(!selectedDate){
      firstDate = date
    }else if(!selectedDate2 && showRangeStatus){
      secondDate = date
      if(moment(selectedDate).isBefore(date)){
        range = moment.range(selectedDate, date)
      }else{
        range = moment.range(date,selectedDate)
      }
    }else{
      firstDate= date
      secondDate = null
      range = null
    }
    changeSelectedDate(moment(firstDate))//.add(moment(firstDate).utcOffset(),'m'))
    changeSelectedDate2(secondDate)
    changeSelectedRange(range)
    console.log('error cause?: ',firstDate, secondDate)
  }
  const confirmSelection = () =>{
    if(showRangeStatus){
    if(selectedDate && selectedDate2){
      pushSelection({startDate: moment(selectedDate), endDate:moment(selectedDate2)})
      navigation.pop()
    }else{
      alert('please select a range')
    }}
    else if(!showRangeStatus){
      if(selectedDate){
        pushSelection({date:moment(selectedDate)})
        navigation.pop()
      }else{
        alert('please select a range')
      }
    }
  }
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleline}>
          <Text style={styles.text}>{showRangeStatus ? 'Select range for export' : 'Select Date'}</Text>
        </View>
        {
          showRangeStatus ?
          <View style={[styles.currentDateline, {backgroundColor:'transparent'}]}>
            <RangeInput startDate={selectedDate} endDate={selectedDate2}/>
          </View>
          :
        <View style={styles.currentDateline}>
          <View style={styles.contentRow}>
            <Text style={[styles.text,{fontSize:35}]}>{selectedDate ? moment(selectedDate).format("ddd, DD MMM."): moment().format("ddd, DD MMM.")}</Text>
            <TouchableOpacity onPress={()=>{}}>
              <Ionicons name={"ios-trash"} size={30} color={"white"}/>
            </TouchableOpacity>
          </View>
        </View>
      }
      </View>
      <View style={styles.optionsline}>
        <TouchableOpacity style={styles.dropdownmenue} onPress={()=>{changeDropDownStatus(!renderDropDownStatus)}}>
          <Text style={[styles.text,{fontSize:16, color:'#a1a1a1',marginRight:4, width:120}]}>{dateInfo.format('MMMM YYYY')}</Text>

          <Ionicons name={"md-arrow-dropdown"} size={24} color={'#a1a1a1'}/>
        </TouchableOpacity>

        {renderDropDownStatus ? renderDropDown() : null}
        <View style={styles.nextMonthControls}>
        <TouchableOpacity onPress={()=>{changeComponentDate(dateInfo.clone().subtract(1,'month'))}}>
          <Ionicons name={"ios-arrow-back"} size={20} color={'#a1a1a1'}/>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=>{changeComponentDate(dateInfo.clone().add(1,'month'))}}>
            <Ionicons name={"ios-arrow-forward"} size={20} color={'#a1a1a1'}/>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.datesContainer}>
        {renderRows(dateInfo.clone())}

      </View>
      <View style={styles.bottomButtonLine}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={()=>{navigation.pop()}}>
          <Text style={[styles.text,{fontSize:18, color:Colors.compound, fontWeight:'bold'}]}>CANCEL</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}}>
            <Text style={[styles.text,{fontSize:18, color:Colors.compound, fontWeight:'bold'}]} onPress={() =>confirmSelection()}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}


const screenSpecs = Dimensions.get("window")
const styles = StyleSheet.create({
  container:{
    position:'absolute',
    top:screenSpecs.height *0.1,
    left:screenSpecs.width * 0.05,
    width:"90%",
    height:512,
    backgroundColor:"#fff",
    zIndex:1
  },
  header:{
    width:"100%",
    height:120,
    backgroundColor:Colors.primary,
    paddingLeft:12,
    paddingRight:12,
  },
  contentRow:{
    width:"100%",
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end'
  },
  titleline:{
    height:32,
    paddingLeft:12,
    paddingRight:12,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-end'
  },
  currentDateline:{
    height:72,
    paddingLeft:12,
    paddingRight:12,
    justifyContent:'flex-end',
  },
  optionsline:{
    height:56,
    paddingLeft:24,
    paddingRight:24,
    paddingTop:16,
    paddingBottom:16,
    justifyContent:'space-between',
    flexDirection:'row'
  },
  dropdownmenue:{
    flexDirection:"row",
    width:120,
  },
  nextMonthControls:{
    flexDirection:"row",
    width:80,
    justifyContent:'space-between'
  },
  datesContainer:{
    height:240,
    width:"100%",
    paddingLeft:12,
    paddingRight:12,
    //backgroundColor:'red'
  },
  weekRow:{
    width:"100%",
    flexDirection:'row',
    justifyContent:'space-between'
  },
  bottomButtonLine:{
    height: 96,
    width:"100%",
    paddingLeft:24,
    paddingRight:24,
    paddingBottom:24,
    alignItems:'flex-end',
    justifyContent:"flex-end",
  },
  buttonContainer:{
    width:120,
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
  },
  field:{
    width:40,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    marginRight:4
  },
  text:{
    fontSize:12,
    color:"#fff"
  }
})


export default DateRangeInput
