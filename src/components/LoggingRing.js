import React from 'react'
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native'

import ButtonWithBackground from '../UI/ButtonWithBackground'
import Colors from '../../constants/Colors'
import Icon from 'react-native-vector-icons/Ionicons';


const LoggingTabs = props => {

  return(
    <View style={{...props.style}}>
      <ButtonWithBackground onPress={()=>{console.log(JSON.stringify(props.lastEvents.map(event =>({event

                                                                                                    }))))}} style={styles.bottomBarButton}>
        <Icon name={"md-document"} size={20} color={"white"}/>
        <Text style={styles.text}>Insepct</Text>
      </ButtonWithBackground>
      <ButtonWithBackground onPress={() => props.onSelect("Cry")} style={styles.bottomBarButton} >
          <Icon name={"md-sad"} size={20} color={"white"}/>
          <Text style={styles.text}>Cry</Text>
      </ButtonWithBackground>
      <ButtonWithBackground onPress={() => props.onSelect("Sleep")} style={styles.bottomBarButton}>
        <Icon name={"md-bed"} size={20} color={"white"}/>
        <Text style={styles.text}>Sleep</Text>
      </ButtonWithBackground>
      <ButtonWithBackground onPress={() => props.onSelect("Food")} style={styles.bottomBarButton}>
        <Icon name={"md-restaurant"} size={20} color={"white"}/>
        <Text style={styles.text}>Food</Text>
      </ButtonWithBackground>
      <ButtonWithBackground onPress={() => props.onSelect("Positives")} style={styles.bottomBarButton}>
        <Icon name={"md-happy"} size={20} color={"white"}/>
        <Text style={styles.text}>Positives</Text>
      </ButtonWithBackground>
      <ButtonWithBackground onPress={() => props.onSelect("Diapers")} style={styles.bottomBarButton}>
        <Icon name={"md-planet"} size={20} color={"white"}/>
        <Text style={styles.text}>Diapers</Text>
      </ButtonWithBackground>
      <ButtonWithBackground onPress={() => props.onSelect("Soothing")} style={styles.bottomBarButton}>
        <Icon name={"md-mic-off"} size={20} color={"white"}/>
        <Text style={styles.text}>Soothing</Text>
      </ButtonWithBackground>
    </View>
  )
}

const deviceWidth = Dimensions.get("window").width

const styles = StyleSheet.create({
  bottomBarButton:{
    width:deviceWidth/4,
    height:"100%",
    justifyContent:"center",
    alignItems: "center",
  },
  text:{
    color:"white",
    fontFamily:"Roboto",
    fontSize:12
  },
  scrollContainer:{
    width:"100%",
    height:"100%",
  }
})


export default LoggingTabs
