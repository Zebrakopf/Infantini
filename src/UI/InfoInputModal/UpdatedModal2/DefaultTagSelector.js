import React, {useState} from 'react'
import {View, FlatList,Text, StyleSheet, Dimensions,TextInput} from 'react-native'
import DefaultTagItem from './DefaultTagItem'
import ButtonWithBackground from '../../ButtonWithBackground'
import Colors from '../../../../constants/Colors'
import {connect} from 'react-redux'
import * as tagActions from '../../../store/actions/tags'

const DefaultTagSelector = (props) =>{


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
    if (props.default){
      return tempTags.filter((name)=> name.charAt(0) == name.charAt(0).toUpperCase())
    }
    return tempTags.filter((name)=> name.charAt(0) == name.charAt(0).toLowerCase())
  }

  const [selectedTags,setSelectedTags] = useState([])
  const initialTags = tagSelector(props.category)
  const [tagInput,setTagInput] = useState("")
  const [randHelper,changeRand] = useState([Math.random()])

  const addingTag = () =>{
    let tagInputTemp  = tagInput.charAt(0).toLowerCase() +  tagInput.slice(1);
    if (props.default){
      tagInputTemp  = tagInput.charAt(0).toUpperCase() +  tagInput.slice(1);
    }
    props.onAddTag(tagInputTemp, props.category)
    setTagInput("")
  }

  const selectionHandler = (name) => {
    if (selectedTags.indexOf(name) === -1 ){
      let newTags = [...selectedTags].concat([name])
      setSelectedTags(newTags)
      props.setSelectedTags(newTags)
    }
    else{
      let newTags = [...selectedTags]
      newTags.splice(newTags.indexOf(name),1)
      setSelectedTags(newTags)
      props.setSelectedTags(newTags)
    }
  }
  const deleteTags = (name) =>{
    props.onDeleteTag(name, props.category)
    changeRand(Math.random())
  }
  return(
    <View style= {styles.body}>
      <View style={{flexDirection:"row", padding: 5}}>
        <TextInput style={styles.input}  value={tagInput} onChangeText={(text) => {setTagInput(text)}} placeholder="New Tags..."/>
        <ButtonWithBackground style={styles.button} title={"Submit"} onPress={() =>{addingTag()}}><Text style={{color:"#fff"}}>Submit</Text></ButtonWithBackground>
      </View>
      <View style= {styles.listContainer}>
        <FlatList style={{height:"100%", width:"100%"}}
        data={initialTags}
        renderItem={({item}) => <DefaultTagItem key={item} name={item} selected={selectedTags.indexOf(item) === -1} selectionHandler={selectionHandler} onDelete={deleteTags}/>}
        keyExtractor={(item, index) => index.toString()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    height:"100%",
    width:"100%",
    alignItems:"center",
    justifyContent:"flex-start",
  },
  listContainer: {
    width: '100%',
    height: '60%',
    alignItems:"center",
    justifyContent:"center",
    marginTop:"5%",
  },
  text: {
    marginTop : 3,
    marginLeft : 5,
    marginRight : 5,
    textAlign : 'center',
    color : '#000'
  },
  input:{
    height:40,
    width:"70%",
    borderColor:Colors.primary,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderLeftWidth:1,
    borderTopLeftRadius:4,
    borderBottomLeftRadius:4,
    backgroundColor:"#fff",
    marginTop:5,
    marginBottom:5,
    padding:2

  },
  button:{
    width:"30%",
    height:40,
    backgroundColor: Colors.compound,
    marginTop:5,
    marginBottom:5,
    borderTopRightRadius:4,
    borderBottomRightRadius:4,
    alignItems:"center",
    justifyContent:"center",
  },
});

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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultTagSelector)
