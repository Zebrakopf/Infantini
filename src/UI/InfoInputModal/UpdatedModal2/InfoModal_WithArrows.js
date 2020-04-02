import React, {useState} from 'react'
import {View, Text, ScrollView, StyleSheet, Button, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import Colors from '../../../../constants/Colors'

import DurationSelect from './DurationSelect'
import DescriptionInput from './DescriptionInput'
import TagInput from './TagInput'
import InfoPage from './infoPage'
import Icon from 'react-native-vector-icons/Ionicons';
import ModalTabs from './modalTabs'
import CryIntensity from './CryIntensity'

const InfoModal = (props) =>{
  const [currentScroll, handleCurrentScroll] = useState(0)
  const [duration,handleDuration] = useState(0)
  const [tags,handleTagState] = useState([''])
  const [description, handleDescription] = useState("")
  const [intensity, handleIntensity] = useState("")
  const [modalContent, setModalContent] = useState(null)
  const [currentScreen, setCurrentScreen] = useState(0)
  const [contentSet, setContentSet] = useState(false)
  const [tabName, setTabName] = useState(['default'])
  const [acceptReady, acceptHandler] = useState(false)



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

  const handleTags = (newTags) => {

    console.log("----------------current selected tags",tags)
    console.log("----------------I am updating tags",newTags)
    handleTagState(tags => tags.concat(newTags))
    }

  const handleTabClick = (index) => {
    console.log('handletabCLick', index, currentScreen)
    if (index === currentScreen) {return null}
    let scrollIndex =  index - currentScreen
    let scroll =currentScroll + (Dimensions.get("window").width*0.9)*scrollIndex
    if (scroll > (Dimensions.get("window").width*0.9)*tabName.length){
      scroll = (Dimensions.get("window").width*0.9)*tabName.length
    }
    setCurrentScreen(index)
    handleCurrentScroll(scroll)
    setContentSet(false)
    scrollerRef.scrollTo({x:scroll,y:0})
    }
  const handleNext = (currentScreenTemp = currentScreen, currentScrollTemp=currentScroll) =>{
    let index = currentScreenTemp + 1
    let scroll =currentScroll + (Dimensions.get("window").width*0.9)
    console.log("should go next", currentScroll,scroll, currentScreen)
    if (scroll > (Dimensions.get("window").width*0.9)*tabName.length){
      scroll = (Dimensions.get("window").width*0.9)*tabName.length
    }
    setCurrentScreen(index)
    setContentSet(false)
    handleCurrentScroll(scroll)
    scrollerRef.scrollTo({x:scroll,y:0})

  }


  const SelectModels = () =>{
    switch(props.category){
      case "Cry":
        setTabName(["Intensity", "duration", 'Tags', 'Description'])
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Specify Intensity"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={1}  category={props.category} currentScreen={currentScreen} >
              <CryIntensity Size={50} onChange={handleIntensity}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Duration: Crying"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} >
              <DurationSelect onChangeDuration={handleDuration}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={3} category={props.category} currentScreen={currentScreen} >
              <TagInput onChangeTags={handleTags} test={()=>{}} selectedTags={tags} category={props.category}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={4} category={props.category} currentScreen={currentScreen} >
              <DescriptionInput onChangeDescription={handleDescription}/>
            </InfoPage>
            </ScrollView>
        )
        break;
      case "Soothing":
        setTabName(["Method", "duration", 'Success','Tags', 'Description'])
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Specify Method"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={1} category={props.category} currentScreen={currentScreen} >
            </InfoPage>
            <InfoPage style={styles.page} title={"Duration: Soothing"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} >
              <DurationSelect onChangeDuration={handleDuration}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Successful?"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={3} category={props.category} currentScreen={currentScreen} >
            </InfoPage>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={4} category={props.category} currentScreen={currentScreen} >
              <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={5} category={props.category} currentScreen={currentScreen} >
              <DescriptionInput onChangeDescription={handleDescription}/>
            </InfoPage>
            </ScrollView>
        )
        break;
      case "Food":
        setTabName(["Category",'Tags', 'Description'])
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Specify Food"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={1} category={props.category} currentScreen={currentScreen} >
            </InfoPage>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} >
              <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={3} category={props.category} currentScreen={currentScreen} >
              <DescriptionInput onChangeDescription={handleDescription}/>
            </InfoPage>
            </ScrollView>
        )
        break;
      case "Diapers":
        setTabName(["Category",'Tags', 'Description'])
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Specify: Diaper"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={1} category={props.category} currentScreen={currentScreen} >
            </InfoPage>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} >
              <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={3} category={props.category} currentScreen={currentScreen} >
              <DescriptionInput onChangeDescription={handleDescription}/>
            </InfoPage>
            </ScrollView>
        )
        break;
      case "Positives":
        setTabName(['Tags', 'Description'])
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={1} category={props.category} currentScreen={currentScreen} >
              <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} >
              <DescriptionInput onChangeDescription={handleDescription}/>
            </InfoPage>
            </ScrollView>
        )
        break;
      case "Sleep":
        setModalContent(
          <ScrollView style={styles.scroll} horizontal ref={(scroller)=>{scrollerRef=scroller}} scrollEnabled={false} snapToInterval={Dimensions.get("window").width*0.9}>
            <InfoPage style={styles.page} title={"Time to fall asleep "} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={1} category={props.category} currentScreen={currentScreen} >
              <DurationSelect onChangeDuration={handleDuration}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Duration of Sleep"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={2} category={props.category} currentScreen={currentScreen} >
              <DurationSelect onChangeDuration={handleDuration}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Extra Tags"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={3} category={props.category} currentScreen={currentScreen} >
              <TagInput onChangeTags={handleTags} selectedTags={tags} category={props.category}/>
            </InfoPage>
            <InfoPage style={styles.page} title={"Description"} onAccept={acceptModal} onNext={handleNext} onClose={props.onClose} stateVis={stateVis} screen={4} category={props.category} currentScreen={currentScreen} >
              <DescriptionInput onChangeDescription={handleDescription}/>
            </InfoPage>
            </ScrollView>
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
  }  return(
    <KeyboardAvoidingView style={styles.container} behaviour={"height"}>
      <ModalTabs style={{height:height*0.05, width:width*0.9, backgroundColor:"black"}} screenNames={tabName} currentTab={currentScroll/(Dimensions.get("window").width*0.9)} onTabClick={handleTabClick}/>
      <View style={styles.scrollContainer}>
        {modalContent}
      </View>
      { currentScroll === 0 ? null : <View style={[styles.buttonContainer,{left:0,    elevation:30,}]} >
        <TouchableOpacity style={{width:"100%",height:"100%", borderRadius:10, alignItems:"center",justifyContent:"center"}} onPress={()=>{
                                                                                                                                          let scroll = currentScroll - (Dimensions.get("window").width*0.9)
                                                                                                                                          setCurrentScreen(prevState => currentScroll/(Dimensions.get("window").width*0.9) - 1)
                                                                                                                                          if(currentScroll !== 0 || currentScroll !== (Dimensions.get("window").width*0.9)*3){
                                                                                                                                          handleCurrentScroll(scroll)
                                                                                                                                          scrollerRef.scrollTo({x:scroll,y:0})}}} title={"yay"}><Icon name={"md-arrow-back"} size={30} color={Colors.primary}/>
        </TouchableOpacity>
      </View>}
    {currentScroll === (Dimensions.get("window").width*0.9)*(tabName.length-1) ? null: <View style={[{right:0, elevation:30},styles.buttonContainer]} >
        <TouchableOpacity style={{width:"100%",height:"100%", borderRadius:10, alignItems:"center",justifyContent:"center"}} onPress={()=>{
                                                                                                                                        let scroll = currentScroll + (Dimensions.get("window").width*0.9)
                                                                                                                                        setCurrentScreen(prevState => currentScroll/(Dimensions.get("window").width*0.9) + 1)
                                                                                                                                        if(currentScroll !== 0 || currentScroll !==( Dimensions.get("window").width*0.9)*3){
                                                                                                                                          handleCurrentScroll(scroll)
                                                                                                                                          scrollerRef.scrollTo({x:scroll,y:0})}}} title={"yay"}><Icon name={"md-arrow-forward"} size={30} color={Colors.primary}/>
        </TouchableOpacity>
      </View>}
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
