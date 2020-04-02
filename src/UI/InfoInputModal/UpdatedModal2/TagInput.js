import React, {useState, useEffect} from 'react'
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native'
import {connect} from 'react-redux'
import * as tagActions from '../../../store/actions/tags'
import Tags from './Tags'
import Icon from 'react-native-vector-icons/Ionicons';
import ButtonWithBackground from '../../ButtonWithBackground'
import Colors from '../../../../constants/Colors'

const TagInput = (props) =>{
  const tagSelector = (category) =>{
    let tempTags
    switch(category){
      case "Cry":
        tempTags = props.tags.cry;
        break;
      case "Sleep":
        tempTags = props.tags.sleep;
        break;
      case "Food":
        tempTags = props.tags.food;
        break;
      case "Soothing":
        tempTags = props.tags.soothing;
        break;
      case "Diapers":
        tempTags = props.tags.diapers;
        break;
      case "Positives":
        tempTags = props.tags.positives;
        break;
    }
    return tempTags.filter((name)=> name.charAt(0) == name.charAt(0).toLowerCase())
  }

  const addingTag = () =>{
    tagInputTemp  = tagInput.charAt(0).toLowerCase() +  tagInput.slice(1);
    props.onAddTag(tagInputTemp.toLowerCase(), props.category)
    setTagInput("")
  }

  const initialTags = tagSelector(props.category)
  const [tagInput,setTagInput] = useState("")
  const [selectedTags, setSelectedTags] = useState([])
  const [randHelper,changeRand] = useState([Math.random()])

   useEffect(()=>{
  },[props.tags])

  const handleTag = (name) =>{
    if (selectedTags.indexOf(name) === -1 ){
      let newTags = [...selectedTags].concat([name])
      props.onChangeTags(newTags)
      setSelectedTags(newTags)
    }
    else{
      let newTags = [...selectedTags]
      newTags.splice(newTags.indexOf(name),1)
      props.onChangeTags(newTags)
      setSelectedTags(newTags)
      changeRand(Math.random())
    }

  }

  const deleteTags = (name, category) =>{
    props.onDeleteTag(name, category)
    changeRand(Math.random)
  }
  return(
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}  value={tagInput} onChangeText={(text) => {setTagInput(text)}} placeholder="New Tags..."/>
        <ButtonWithBackground style={styles.button} title={"Submit"} onPress={() =>{addingTag()}}><Text>Submit</Text></ButtonWithBackground>
      </View>
        <View style={styles.tagContainer}>
        { initialTags.map(x => <Tags key={x} name={x} onClick={handleTag} selected={selectedTags.indexOf(x) === -1} onDelete={deleteTags} category={props.category}/>)}
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    height: "90%",
    width:"100%",
    backgroundColor:"#fff",
    alignItems:"flex-start",
    justifyContent:"flex-start",
    flexDirection:"column",
  },
  tagContainer:{
    backgroundColor:'#fff',
    width:"100%",
    height:"50%",
    alignContent:"center",
    alignItems:"center",
    flexDirection:"row",
    flexWrap: 'wrap',
    marginTop:10
  },
  item:{
    alignItems:"center",
    justifyContent:"center",
    borderBottomWidth:1,
    height:50,
    width:"90%"

  },
  inputContainer:{
    width:"100%",
    height:"20%",
    justifyContent:"flex-start",
    flexDirection:"row",
    alignItems:"center",
    marginTop:20
  },
  button:{
    width:"30%",
    height:"100%",
    backgroundColor: Colors.light,
    marginBottom:5,
    borderRadius:4,
    alignItems:"center",
    justifyContent:"center",
  },
  input:{
    height:"100%",
    width:"70%",
    borderColor:Colors.primary,
    borderWidth:1,
    borderRadius:4,
    backgroundColor:"#fff",
    marginTop:5,
    marginBottom:5,
    padding:2

  }

})

const mapStateToProps = state => {
  return {
    tags: state.tags.allTags
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAddTag: (name, category) => dispatch(tagActions.addTag(name, category)),
    onDeleteTag: (name, category) => dispatch(tagActions.deleteTag(name, category))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(TagInput)
