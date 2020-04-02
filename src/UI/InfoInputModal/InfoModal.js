import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet, Button, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import Colors from '../../../constants/Colors'

import DurationSelect from './DurationSelect'
import DescriptionInput from './DescriptionInput'
import TagInput from './TagInput'
import InfoPage from './infoPage'
import Icon from 'react-native-vector-icons/Ionicons';


const InfoModal = (props) =>{
const [currentScroll, handleCurrentScroll] = useState(0)
const [duration,handleDuration] = useState(0)
const [tags,handleTags] = useState([])
const [description, handleDescription] = useState("")

const acceptModal = () =>{
  switch(props.infoNeeded){
    case "Time&Tag":
      if(duration === 0){
        alert("please specify the duration")
        break;
      }
      if (tags.length < 1){
        alert("please specify at least 1 tag")
        break;
      }
      props.onAccept(duration,tags,description)
      break;
    case "Tag":
      if (tags.length < 1){
        alert("please specify at least 1 tag")
        break;
      }
      props.onAccept(3,tags,description)
      break;
  }
}

  return(
    <KeyboardAvoidingView style={styles.container} behaviour={"height"}>
      <View style={styles.scrollContainer}>
        <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
          {props.infoNeeded === "Time&Tag" ?
          <InfoPage style={styles.page} title={"Duration of Event"} onAccept={acceptModal} onClose={props.onClose}>
            <DurationSelect onChangeDuration={handleDuration}/>
          </InfoPage> : null
          }
          <InfoPage style={[styles.page, {paddingLeft:5,paddingRight:5}]}  title={"Tag the Event"} onAccept={acceptModal} onClose={props.onClose}>
            <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
          </InfoPage>
          <InfoPage style={styles.page} title={"Enter a Description"} onAccept={acceptModal} onClose={props.onClose}>
            <DescriptionInput onChangeDescription={handleDescription}/>
          </InfoPage>
        </ScrollView>
      </View>
      <View style={[styles.buttonContainer,{left:0,    elevation:30,}]} >
        <TouchableOpacity style={{width:"100%",height:"100%", borderRadius:10, alignItems:"center",justifyContent:"center"}} onPress={()=>{
                                                                                                                                          let scroll = currentScroll - (Dimensions.get("window").width*0.9)
                                                                                                                                          if(currentScroll !== 0 || currentScroll !== (Dimensions.get("window").width*0.9)*3){
                                                                                                                                          handleCurrentScroll(scroll)
                                                                                                                                          scrollerRef.scrollTo({x:scroll,y:0})}}} title={"yay"}><Icon name={"md-arrow-back"} size={30} color={Colors.primary}/></TouchableOpacity>
      </View>
      <View style={[{right:0, elevation:30},styles.buttonContainer]} >
        <TouchableOpacity style={{width:"100%",height:"100%", borderRadius:10, alignItems:"center",justifyContent:"center"}} onPress={()=>{
                                                                                                                                        let scroll = currentScroll + (Dimensions.get("window").width*0.9)
                                                                                                                                        if(currentScroll !== 0 || currentScroll !==( Dimensions.get("window").width*0.9)*3){
                                                                                                                                          handleCurrentScroll(scroll)
                                                                                                                                          scrollerRef.scrollTo({x:scroll,y:0})}}} title={"yay"}><Icon name={"md-arrow-forward"} size={30} color={Colors.primary}/></TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const {width,height} = Dimensions.get("window")

const styles = StyleSheet.create({
  container:{
    width:width,
    height:height*0.5,
    alignItems:"center",
    justifyContent:"center",
    elevation: 1,
    marginBottom:height*0.1
  },
  scrollContainer:{
    width:width*0.9,
    height:height*0.5,
    backgroundColor:"blue"
  },
  page:{
    height:height*0.5,
    width:width*0.9,
    paddingLeft:25,
    paddingRight:25,
    elevation:5,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center"
  },
  text:{
    fontSize:42
  },
  buttonContainer :{
    width:50,
    height:50,
    backgroundColor:"#fff",
    position:"absolute",
    borderRadius:30,
  },

})


export default InfoModal
