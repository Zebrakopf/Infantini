import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import Colors from '../../../constants/Colors'
import ButtonWithBackground from '../../UI/ButtonWithBackground'

const SettingsItem = (props) =>{
  return(
    <View style={styles.row}>
      <View style={styles.descriptionHolder}>
        <Text>
        {props.description}
        </Text>
      </View>
        <View style={styles.buttonHolder}>
          <ButtonWithBackground style={styles.button} title={"Revert Tags"} onPress={() =>{props.onPress()}} ><Text style={{color:'#fff', fontSize:18}}>Delete</Text></ButtonWithBackground>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row:{
    width:'100%',
    height:60,
    borderBottomWidth:1,
    borderTopWidth:1,
    borderColor:'#bbb',
    flexDirection:'row',
    padding:5,

  },
  descriptionHolder:{
    width:'70%',
    alignItems:'flex-start',
    justifyContent:"center",
  },
  buttonHolder:{
    width:'30%',
    alignItems:'flex-start',
    justifyContent:"center",
  },
  button:{
    width:'100%',
    height:40,
    alignItems:'center',
    backgroundColor:'red'
  }
})

export default SettingsItem
