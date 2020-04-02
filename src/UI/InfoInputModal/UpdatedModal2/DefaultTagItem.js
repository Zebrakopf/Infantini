import React, {useState} from'react';
import {View, Text, StyleSheet, TouchableOpacity, Image,} from 'react-native';
import Colors from '../../../../constants/Colors'
import Icon from 'react-native-vector-icons/Ionicons';

const DefaultTagItem = (props) => {
  const [numOfLines,lineHelper] = useState(1)
  const [onLayoutCheck,layoutHelper] = useState(0)


  const onPressHandler = () =>{
    props.selectionHandler(props.name)
  }
  const handleTextLines = (lines) =>{
    let numberOfLines = lines
    if(onLayoutCheck){
      numberOfLines = numOfLines
    }
    lineHelper(numberOfLines)
    layoutHelper(1)
  }


  return(
  <TouchableOpacity onPress={onPressHandler} onLongPress={()=>{props.onDelete(props.name)}}>
    <View style={styles.listItem}>
      <View style={styles.textHolder}>
        <View style={{width:'15%', flexDirection:'row', justifyContent:'flex-start'}}>
          {!props.selected ? <View style={{width:'100%',height:30, backgroundColor:Colors.primary, borderTopLeftRadius:20, borderBottomLeftRadius:20, alignItems:'center', justifyContent:'center'}}>
            <Icon name={'md-checkmark'} size={19} color={'#fff'}/>
          </View> : null }
        </View>
        <View style={[styles.textHolderHolder,{borderWidth: props.selected ? 0 : 1, borderColor:Colors.primary}]}>
          <Text style={[styles.text,{fontSize:15 - numOfLines*2}]} onTextLayout={({ nativeEvent: { lines } }) => handleTextLines(lines.length)}>{props.name}</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
  )
};

// <View style={styles.checkbox}>
//  {props.selected ? <Icon name={'md-checkmark'} size={19} color={Colors.primary}/> : null }
// </View>

const styles = StyleSheet.create({
  listItem: {
    width:"100%",
    backgroundColor: "#fff",
    marginBottom: 3,
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
    borderRadius:5
  },
  textHolder: {
    width:"100%",
    height:30,
    backgroundColor: Colors.compound,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'flex-start',
    borderRadius:20,
  },
  checkbox:{
    borderWidth:1,
    borderColor:"black",
    borderRadius:100,
    height:20,
    width:20,
    marginRight:20,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    color:"#fff",
    //fontFamily:"Roboto",
    fontWeight:"bold",
  },
  textHolderHolder:{
    width:'85%',
    height:"100%",
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'center',
    paddingLeft:10,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    padding:5
  }

});

export default DefaultTagItem;
