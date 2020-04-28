import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet, Button, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import Colors from '../../../../constants/Colors'

import DurationSelect from './DurationSelect'
import DurationSelect_Sec from './DurationSelect_Sec'
import DescriptionInput from './DescriptionInput'
import InfoPage from './infoPage'
import Icon from 'react-native-vector-icons/Ionicons';
import ModalTabs from './modalTabs_rounded'
import CryIntensity from './CryIntensity'
import DefaultTagSelector from './DefaultTagSelector'
import SuccessSelector from './SuccessSelector'


let testVar = ""
const InfoModal = (props) =>{
  const [duration,handleDurationState] = useState(0)
  const [durationAsleep, handleDurationAsleepState] = useState(null)
  const [tags,handleTagState] = useState([[],[]])//[userTags][defualtTags]..later flattened
  // const [descriptionState,setDescriptionState] = useState("")
  const [testState,setTest] = useState("")
  const [intensity, handleIntensityState] = useState(null)
  const [soothingSuccess, handleSuccess] = useState(null)

  const [modalContent, setModalContent] = useState(null)

  const [currentScreen, setCurrentScreen] = useState(0)
  const [currentScroll, handleCurrentScroll] = useState(0)
  const [contentSet, setContentSet] = useState(false)
  const [tabName, setTabName] = useState(['default'])
  const [acceptReady, acceptHandler] = useState(false)
  const [readyToSubmit, readyHandler] = useState(false)
  const [randHelper,changeRand] = useState([Math.random()])


  const [descriptionState, dispatch] = React.useReducer(
    (prevState, action) => {
      console.log("inside reducer:", action.description,prevState)
      return {
        ...prevState,
        description:action.description
      }
    },
    {

    }
  );
  const checkReadyStatus = () => {
    let readyStatus = false
    switch(props.category){
      case "Cry":
        if(duration && intensity){
          readyStatus = true
        }
        break;
      case "Soothing":
        if(duration && tags && (soothingSuccess == 'yes' || soothingSuccess == 'no')){
          readyStatus = true
        }
        break;
      case "Food":
        if(tags.length){
          readyStatus = true
        }
        break;
      case "Diapers":
        if(tags){
          readyStatus = true
        }
        break;
      case "Positives":
        if(tags){
          readyStatus = true
        }
        break;
      case "Sleep":
        if(tags && durationAsleep && duration){
          readyStatus = true
        }
        break;
  }
    console.log("readyStatus",readyStatus, duration, intensity)
    readyHandler(readyStatus)
  }

  const handleTags = (newTags,isDefault) => {
    let defaultTags = []
    let userTags = []
    if(isDefault){
      defaultTags = newTags
      userTags = tags[0]
    }else{
      userTags = newTags
      defaultTags = tags[1]
    }
    handleTagState([userTags,defaultTags])
    setContentSet(false)
    }

  const handleTabClick = (index) => {
    if (index === currentScreen) {return null}
    let scrollIndex =  index - currentScreen
    let scroll =currentScroll + (Dimensions.get("window").width*0.9)*scrollIndex
    if (scroll > (Dimensions.get("window").width*0.9)*tabName.length){
      scroll = (Dimensions.get("window").width*0.9)*tabName.length
    }
    if(scroll < 0){
      scroll = 0
    }
    setCurrentScreen(index)
    handleCurrentScroll(scroll)
    setContentSet(false)
    scrollerRef.scrollTo({x:scroll,y:0})
    }

  const handleNext = (currentScreenTemp = currentScreen, currentScrollTemp=currentScroll) =>{
    let index = currentScreenTemp + 1
    let scroll =currentScroll + (Dimensions.get("window").width*0.9)
    if (scroll > (Dimensions.get("window").width*0.9)*tabName.length){
      scroll = (Dimensions.get("window").width*0.9)*tabName.length
    }
    setCurrentScreen(index)
    setContentSet(false)
    handleCurrentScroll(scroll)
    scrollerRef.scrollTo({x:scroll,y:0})

  }
  const handleDescription = (text) =>{
  //console.log("------letters from Statedesc",descriptionState)
    console.log("------letters from desc",text.nativeEvent.text)
    //descirption for some reason not set at the moment
    //setDescriptionState(text.nativeEvent.text)
    dispatch({ type: 'UPDATE', description: text.nativeEvent.text  })

    setContentSet(false)
  }
  const handleDuration = (dur) => {
    if (dur === duration) return null
    handleDurationState(dur)
    setContentSet(false)
  }
  const handleDurationAsleep = (dur) => {
    if (dur === duration) return null
    handleDurationAsleepState(dur)
    setContentSet(false)
  }
  const handleIntensity = (val) => {
    handleIntensityState(val)
    setContentSet(false)
  }
  const handleSoothingSuccess = (val) => {
    handleSuccess(val)
    setContentSet(false)
  }

  const SelectModels = () =>{
    switch(props.category){
      case "Cry":
        setTabName(["Intensity", "Duration", 'Tags', 'Description'])
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Specify Intensity"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={1}  category={props.category} currentScreen={currentScreen} >
              <CryIntensity Size={50} onChange={handleIntensity}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Duration: Crying"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={2} category={props.category} currentScreen={currentScreen} >
              <DurationSelect onChangeDuration={handleDuration}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={3} category={props.category} currentScreen={currentScreen} >
              <DefaultTagSelector category={props.category} setSelectedTags={handleTags} default/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={4} category={props.category} currentScreen={currentScreen} lastScreen>
              <DescriptionInput onChangeDescription={handleDescription} descriptionState={descriptionState}/>
            </InfoPage>
            </ScrollView>
        )
        break;
      case "Soothing":
        setTabName(["Method", "Duration", 'Success','Tags', 'Description'])
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Specify Method"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={1} category={props.category} currentScreen={currentScreen} >
              <DefaultTagSelector category={props.category} setSelectedTags={handleTags} default/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Duration: Soothing"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={2} category={props.category} currentScreen={currentScreen} >
              <DurationSelect onChangeDuration={handleDuration}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Successful?"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={3} category={props.category} currentScreen={currentScreen} >
              <SuccessSelector handleSuccessChange={handleSoothingSuccess}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={4} category={props.category} currentScreen={currentScreen} >
              <DefaultTagSelector category={props.category} setSelectedTags={handleTags} />
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={5} category={props.category} currentScreen={currentScreen} lastScreen >
              <DescriptionInput onChangeDescription={handleDescription} descriptionState={descriptionState}/>
            </InfoPage>
            </ScrollView>
        )
        break;
      case "Food":
        setTabName(["Category",'Tags', 'Description'])
        handleDurationState(5)
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Specify Food"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={1} category={props.category} currentScreen={currentScreen} >
              <DefaultTagSelector category={props.category} setSelectedTags={handleTags} default/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={2} category={props.category} currentScreen={currentScreen} >
              <DefaultTagSelector category={props.category} setSelectedTags={handleTags}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={3} category={props.category} currentScreen={currentScreen} lastScreen>
              <DescriptionInput onChangeDescription={handleDescription} descriptionState={descriptionState}/>
            </InfoPage>
            </ScrollView>
        )
        break;
      case "Diapers":
        setTabName(["Category",'Tags', 'Description'])
        handleDurationState(5)
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Specify: Diaper"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={1} category={props.category} currentScreen={currentScreen} >
              <DefaultTagSelector category={props.category} setSelectedTags={handleTags} default/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={2} category={props.category} currentScreen={currentScreen} >
              <DefaultTagSelector category={props.category} setSelectedTags={handleTags} />
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={3} category={props.category} currentScreen={currentScreen} lastScreen>
              <DescriptionInput onChangeDescription={handleDescription} descriptionState={descriptionState}/>
            </InfoPage>
            </ScrollView>
        )
        break;
      case "Positives":
        setTabName(['Tags', 'Description'])
        handleDurationState(5)
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={1} category={props.category} currentScreen={currentScreen} >
              <DefaultTagSelector category={props.category} setSelectedTags={handleTags} default/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={2} category={props.category} currentScreen={currentScreen} lastScreen>
              <DescriptionInput onChangeDescription={handleDescription} descriptionState={descriptionState}/>
            </InfoPage>
            </ScrollView>
        )
        break;
      case "Sleep":
        setTabName(['Asleep','Duration', 'Tags', 'Description'])
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Time to fall asleep "} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={1} category={props.category} currentScreen={currentScreen} >
              <DurationSelect_Sec onChangeDuration={handleDurationAsleep}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Duration of Sleep"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={2} category={props.category} currentScreen={currentScreen} >
              <DurationSelect onChangeDuration={handleDuration}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={3} category={props.category} currentScreen={currentScreen} >
              <DefaultTagSelector category={props.category} setSelectedTags={handleTags} default/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} ready={readyToSubmit} screen={4} category={props.category} currentScreen={currentScreen} lastScreen>
              <DescriptionInput onChangeDescription={handleDescription} descriptionState={descriptionState}/>
            </InfoPage>
            </ScrollView>
        )
        break;
  }
  };


  const acceptModal = () =>{
    console.log("---------------desc working in the modal?", descriptionState.description)

    props.onAccept(duration,tags.flat(), descriptionState.description,intensity,durationAsleep, soothingSuccess)
  }

  if (!contentSet){
    checkReadyStatus()
    SelectModels()
    let reRender = 1
    if(randHelper){
      //This renders twice upon input to make sure the activated Accept button activates on time and doesn't stay erroniously active
      reRender = 0
      setContentSet(true)
    }
    changeRand(reRender)
  }

  return(
    <KeyboardAvoidingView style={styles.container} behaviour={"height"}>
      <ModalTabs style={{height:height*0.05, width:width*0.9, backgroundColor:"black"}} screenNames={tabName} currentTab={currentScroll/(Dimensions.get("window").width*0.9)} onTabClick={handleTabClick}/>
      <View style={styles.scrollContainer}>
        {modalContent}
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
    backgroundColor:"blue",
    borderWidth:0.5,
    borderColor:"#E0E0E0",
    //elevation:20
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
