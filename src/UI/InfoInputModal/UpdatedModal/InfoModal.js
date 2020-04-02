import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView, StyleSheet, Button, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import Colors from '../../../../constants/Colors'

import DurationSelect from './DurationSelect'
import DescriptionInput from './DescriptionInput'
import TagInput from './TagInput'
import InfoPage from './infoPage'
import Icon from 'react-native-vector-icons/Ionicons';


const InfoModal = (props) =>{
const [currentScroll, handleCurrentScroll] = useState(0)
const [duration,handleDuration] = useState(0)
const [tags,handleTagState] = useState([])
const [description, handleDescription] = useState("")
const [modalContent, setModalContent] = useState(null)
const [currentScreen, setCurrentScreen] = useState(1)
const [contentSet, setContentSet] = useState(false)


const stateVis = (screenNr,category, propCurrentScreen) =>{
  console.log("ich hange")
  let screenAmount = 0
  switch(category){
    case "Cry":
      screenAmount = 4
      break;
    case "Soothing":
      screenAmount = 5
      break;
    case "Food":
      screenAmount = 3
      break;
    case "Diaper":
      screenAmount = 3
      break;
    case "Positives":
      screenAmount = 2
      break;
    case "Sleep":
      screenAmount = 4
      break;
}
    if(propCurrentScreen  === screenNr)
    {
      console.log("ich bin voll", screenNr)
      return "Full"
    }
    if(propCurrentScreen> screenNr){
      console.log("ich bin collapse", screenNr)
      return "Collapse"}
    if(propCurrentScreen < screenNr){
      console.log("ich bin hidden", screenNr)
      return "Hidden"}
    }
const nextScreen = (revert = 0) => {
  if (revert !== 0){
    setCurrentScreen(revert)
    setContentSet(false)
    return
  }
  console.log("next Page")
  let screenAmount = 0

  console.log(currentScreen, screenAmount)
  switch(props.category){
    case "Cry":
      screenAmount = 4
      break;
    case "Soothing":
      screenAmount = 5
      break;
    case "Food":
      screenAmount = 3
      break;
    case "Diaper":
      screenAmount = 3
      break;
    case "Positives":
      screenAmount = 2
      break;
    case "Sleep":
      screenAmount = 4
      break;
}
  setCurrentScreen(prevState =>prevState + 1)
  setContentSet(false)
}

const handleTags = (newTags, operation) => {
  handleTagState([...newTags])
  }



const SelectModels = () =>{
  switch(props.category){
    case "Cry":
      setModalContent(
        <View style={styles.scrollContainer}>
          <InfoPage style={styles.page} title={"Specify Intensity"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={1}  category={props.category} currentScreen={currentScreen} onNext={nextScreen}>

          </InfoPage>
          <InfoPage style={styles.page} title={"Duration: Crying"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <DurationSelect onChangeDuration={handleDuration}/>
          </InfoPage>
          <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={3} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
          </InfoPage>
          <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={4} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <DescriptionInput onChangeDescription={handleDescription}/>
          </InfoPage>
        </View>
      )
      break;
    case "Soothing":
      setModalContent(
        <View style={styles.scrollContainer}>
          <InfoPage style={styles.page} title={"Specify Method"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={1} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
          </InfoPage>
          <InfoPage style={styles.page} title={"Duration: Soothing"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <DurationSelect onChangeDuration={handleDuration}/>
          </InfoPage>
          <InfoPage style={styles.page} title={"Successful?"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={3} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
          </InfoPage>
          <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={4} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
          </InfoPage>
          <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={5} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <DescriptionInput onChangeDescription={handleDescription}/>
          </InfoPage>
        </View>
      )
      break;
    case "Food":
      setModalContent(
        <View style={styles.scrollContainer}>
          <InfoPage style={styles.page} title={"Specify Food"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={1} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
          </InfoPage>
          <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
          </InfoPage>
          <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={3} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <DescriptionInput onChangeDescription={handleDescription}/>
          </InfoPage>
        </View>
      )
      break;
    case "Diaper":
      setModalContent(
        <View style={styles.scrollContainer}>
          <InfoPage style={styles.page} title={"Specify: Diaper"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={1} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
          </InfoPage>
          <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
          </InfoPage>
          <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={3} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <DescriptionInput onChangeDescription={handleDescription}/>
          </InfoPage>
        </View>
      )
      break;
    case "Positives":
      setModalContent(
        <View style={styles.scrollContainer}>
          <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={1} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
          </InfoPage>
          <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <DescriptionInput onChangeDescription={handleDescription}/>
          </InfoPage>
        </View>
      )
      break;
    case "Sleep":
      setModalContent(
        <View style={styles.scrollContainer}>
          <InfoPage style={styles.page} title={"Time to fall asleep "} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={1} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <DurationSelect onChangeDuration={handleDuration}/>
          </InfoPage>
          <InfoPage style={styles.page} title={"Duration of Sleep"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <DurationSelect onChangeDuration={handleDuration}/>
          </InfoPage>
          <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={3} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
          </InfoPage>
          <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onClose={props.onClose} stateVis={stateVis} screen={4} category={props.category} currentScreen={currentScreen} onNext={nextScreen}>
            <DescriptionInput onChangeDescription={handleDescription}/>
          </InfoPage>
        </View>
      )
      break;
}
};


const acceptModal = () =>{
  // switch(props.infoNeeded){
  //   case "Time&Tag":
  //     if(duration === 0){
  //       alert("please specify the duration")
  //       break;
  //     }
  //     if (tags.length < 1){
  //       alert("please specify at least 1 tag")
  //       break;
  //     }
  //     props.onAccept(duration,tags,description)
  //     break;
  //   case "Tag":
  //     if (tags.length < 1){
  //       alert("please specify at least 1 tag")
  //       break;
  //     }
  //     props.onAccept(3,tags,description)
  //     break;
  // }
}
if (!contentSet){
 SelectModels()
 setContentSet(true)
}
  return(
    <KeyboardAvoidingView style={styles.container} behaviour={"height"}>
      {modalContent}
    </KeyboardAvoidingView>
  )
}

const {width,height} = Dimensions.get("window")

const styles = StyleSheet.create({
  container:{
    width:width,
    height:height,
    alignItems:"center",
    justifyContent:"center",
    elevation: 1,
    backgroundColor:'green',
    justifyContent:"flex-start"
  },
  scrollContainer:{
    width:width*0.9,
    height:height,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"flex-end",
    paddingBottom:20
  },
  page:{
    height:height*0.5,
    width:width*0.8,
    paddingLeft:25,
    paddingRight:25,
    elevation:5,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center",
    //borderWidth:1,
    //borderColor:"#bbb"
  },
  text:{
    fontSize:42
  },

})


export default InfoModal
