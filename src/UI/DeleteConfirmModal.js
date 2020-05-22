import React, {useState,useEffect} from 'react'
import {View, Text, StyleSheet, Dimensions, Animated,Easing,TouchableOpacity, ScrollView} from 'react-native'
import moment from 'moment'
import Colors from '../../constants/Colors'
import ButtonWithBackground from './ButtonWithBackground'

const DeleteConfirmModal = (props) =>{
  const [firstRender,handleFirstRender] = useState(true)
  const [animatedValue,dud] = useState(new Animated.Value(1))
  let  animatedValueForFadeIn = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange:[ 0, windowWidth],
  })
  let onCancel = () => {

    Animated.timing(animatedValue, { //animating this value from zero to one will update the subcategory container height, which interpolates this value
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver:true
    }).start(() => {
                    props.onCancel()
                    })
  }
  let onDelete = () => {
    let deletedItemId = props.info ? props.info[0].id : 'no event'
    Animated.timing(animatedValue, { //animating this value from zero to one will update the subcategory container height, which interpolates this value
      toValue: 1,
      duration: 300,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver:true
    }).start(() => {
                    props.onCancel()
                    props.onDelete(deletedItemId)
                    })
  }

  let selectContent = (event) => {
    switch(event.category){
      case 'Cry':{
        return(
          <View style={{flexDirection:"row",justifyContent:'flex-start',alignItems:"center", width:"100%",marginTop:20,marginLeft:'20%'}}>
            <Text style={{color:'#fff', fontSize:15,marginTop:0}}>Intensity: {event.intensity}</Text>
          </View>
        )
      }
      case 'Soothing':{
        return(
          <View style={{flexDirection:"row",justifyContent:'flex-start',alignItems:"center", width:"100%",marginTop:20,marginLeft:'20%'}}>
            <Text style={{color:'#fff', fontSize:15,marginTop:0}}>Success: {event.success}</Text>
          </View>
        )
      }
      case 'Sleep':{
        return(
          <View style={{flexDirection:"row",justifyContent:'flex-start',alignItems:"center", width:"100%",marginTop:20,marginLeft:'20%'}}>
            <Text style={{color:'#fff', fontSize:15,marginTop:0}}>Time till sleep: {event.fallAsleep} minutes</Text>
          </View>
        )
      }
    }
    return ( //default
      null
    )
  }
  useEffect(()=>{
    if(firstRender){
      handleFirstRender(false)
      console.log('--------deletewindow renders')
      Animated.timing(animatedValue, { //animating this value from zero to one will update the subcategory container height, which interpolates this value
        toValue: 0,
        duration: 300,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver:true
      }).start(() => {  })
    }
    if(!props.active){
      onCancel()
    }else{
      Animated.timing(animatedValue, { //animating this value from zero to one will update the subcategory container height, which interpolates this value
        toValue: 0,
        duration: 300,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver:true
      }).start(() => {  })
    }
  },[props.active])


  if(props.settings)
    {return(
      <Animated.View style={[styles.container,{transform: [{
                                                          translateX: animatedValue.interpolate({
                                                            inputRange: [0, 1],
                                                            outputRange: [0, windowWidth]
                                                          })
                                                        }]}]}>
        <View style={[styles.row,{alignItems:'flex-start',paddingTop:10}]}>
          <Text style={{color:'#fff', fontWeight:'bold', fontSize:19,}}>Permanently Delete {props.settings ? 'all tags' : 'Event'}</Text>
        </View>
        <View style={[styles.row,{justifyContent:'space-between'}]}>
        {
          props.active ? props.settings ? <Text style={{color:'#fff', fontSize:15,}}> Reset all tags?</Text> :
          <>
          <Text style={{color:'#fff', fontSize:15,}}>Category: {props.info ? props.info[0].category : ''}</Text>
          <View style={styles.timebar}/>
          <Text style={{color:'#fff', fontSize:15,}}>start: { props.info ? moment(props.info[0].timeStamp.startDateObj).subtract(moment().utcOffset(),'m').format("HH:mm"): ''}</Text>
          </> : null
          }
        </View>
        <View style={[styles.row,{padding:0,paddingBottom:10}]}>
          <ButtonWithBackground style={{...styles.buttonLeft,backgroundColor: Colors.compound}} title={"Cancel"} onPress={() =>{onCancel()}}><Text style={{color:'#fff', fontSize:18}}>No</Text></ButtonWithBackground>
          <ButtonWithBackground style={{...styles.buttonRight,backgroundColor:"red"}} title={"Next"} onPress={() =>{onDelete()}} ><Text style={{color:"#fff", fontSize:18}}>Yes</Text></ButtonWithBackground>
        </View>
      </Animated.View>
  )}
  if(props.info){
  return ( <Animated.View style={[styles.container,{transform: [{
                                                        translateX: animatedValue.interpolate({
                                                          inputRange: [0, 1],
                                                          outputRange: [0, windowWidth]
                                                        })
                                                      }]}]}>
      <View style={[styles.row,{alignItems:'flex-start',paddingTop:10,height:"20%"}]}>
        <Text style={{color:'#fff', fontWeight:'bold', fontSize:19,}}>Permanently Delete {props.info ? props.info[0].category : ''} Event?</Text>
      </View>
      <View style={[styles.row,{justifyContent:'flex-start',alignItems:"center",height:"47%",flexDirection:'column'}]}>
        <View style={{flexDirection:"row",justifyContent:'center',alignItems:"center", width:"100%"}}>
          <Text style={{color:'#fff', fontSize:15,marginTop:0}}>{ props.info ? moment(props.info[0].timeStamp.startDateObj).subtract(moment().utcOffset(),'m').format("HH:mm"): ''}</Text>
          <View style={styles.timebar}/>
          <Text style={{color:'#fff', fontSize:15,}}>{ props.info ? moment(props.info[0].timeStamp.endDateObj).subtract(moment().utcOffset(),'m').format("HH:mm"): ''}</Text>
        </View>
        {selectContent(props.info[0])}
        <View style={{flexDirection:"row",justifyContent:'center',alignItems:"center", width:"100%",marginTop:20,marginLeft:'20%'}}>
          <Text style={{color:'#fff', fontSize:15,marginTop:0}}>Tags: </Text>
          <ScrollView contentContainerSTyle={{height:30,alignItems:'flex-start', justifyContent:'flex-start', flexDirection:'row'}} horizontal={true} showsHorizontalScrollIndicator={false}>
          <>
            {
                props.info[0].qualifier.map((tag,idx)=>{
                  return (<Text style={{color:'#fff', fontSize:15,marginTop:0}} key={idx}>{tag}{idx ===  props.info[0].qualifier.length -1 ? '' : ',' } </Text>)
                })
                }

            </>
          </ScrollView>
        </View>
      </View>
      <View style={[styles.row,{padding:0,paddingBottom:10}]}>
        <ButtonWithBackground style={{...styles.buttonLeft,backgroundColor: Colors.compound}} title={"Cancel"} onPress={() =>{onCancel()}}><Text style={{color:'#fff', fontSize:18}}>No</Text></ButtonWithBackground>
        <ButtonWithBackground style={{...styles.buttonRight,backgroundColor:"red"}} title={"Next"} onPress={() =>{onDelete()}} ><Text style={{color:"#fff", fontSize:18}}>Yes</Text></ButtonWithBackground>
      </View>
    </Animated.View>)
}
return null
}

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container:{
    height:windowHeight*0.4,
    width:windowWidth,
    position:'absolute',
    top:windowHeight * 0.4,
    backgroundColor:Colors.primary,
    opacity:0.9,
    zIndex:8
  },
  row:{
    flexDirection:'row',
    width:"100%",
    height:"33%",
    paddingLeft:20,
    paddingRight:20,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonLeft:{
    height:40,
    width:110,
    backgroundColor: "green",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20,
    marginRight:'5%',
    elevation:2
  },
  buttonRight:{
    height:40,
    width:110,
    backgroundColor: Colors.primary,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:20,
    marginLeft:'5%',
    elevation:2
  },
  timebar:{
    width: "50%",
    height:1,
    backgroundColor:"#fff",
    borderRadius:33,
    marginLeft:8,
    marginRight:8}

})

export default DeleteConfirmModal
