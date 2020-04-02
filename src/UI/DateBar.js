import React, {Component} from 'react'
import {View, FlatList,Text, StyleSheet, Button,PanResponder, Animated, Dimensions } from 'react-native'
import moment from 'moment'
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors'

import ButtonWithBackground from './ButtonWithBackground'



class DateBar extends Component{

  constructor(props){
    super(props);

  this.state = {
    translateX: new Animated.Value(0),
   opacityValue: new Animated.Value(0),
}


    this._panResponder = PanResponder.create({

       onStartShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([null, { dx: this.state.translateX }])(evt, gestureState);
     Animated.timing(this.state.opacityValue, {
       toValue: 1,
       duration: 50,
       useNativeDriver: true
     }).start();
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, {vx, dx}) => {
        const width = Dimensions.get("window").width
        if (Math.abs(dx) >= 0.5 * width && Math.sign(dx) != -1) {
          this.props.pressChange((this.props.title ==="Hour")?"h":"d","back")
          // Animated.timing(this.state.translateX, {
          //   toValue: dx > 0 ? width : -width,
          //   duration: 200,
          //   useNativeDriver: true
          // }).start();
          Animated.parallel([
            Animated.spring(this.state.translateX, {
              toValue: 0,
              bounciness: 20,
              useNativeDriver: true
            }),
            Animated.timing(this.state.opacityValue, {
              toValue: 0,
              duration: 5,
              useNativeDriver: true
            })
        ]).start();
      } else if(Math.abs(dx) >= 0.5 * width && Math.sign(dx) != 1) {
          // next: add code for bringing back the component to its original position
          this.props.pressChange((this.props.title ==="Hour")?"h":"d","front")

          Animated.parallel([
            Animated.spring(this.state.translateX, {
              toValue: 0,
              bounciness: 20,
              useNativeDriver: true
            }),
            Animated.timing(this.state.opacityValue, {
              toValue: 0,
              duration: 5,
              useNativeDriver: true
            })
        ]).start();
      } else{
        Animated.parallel([
          Animated.spring(this.state.translateX, {
            toValue: 0,
            bounciness: 20,
            useNativeDriver: true
          }),
          Animated.timing(this.state.opacityValue, {
            toValue: 0,
            duration: 5,
            useNativeDriver: true
          })
      ]).start();
      }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      }
    })
  }
  componentDidMount(){
    this.setState({
      cardOpacity: this.state.opacityValue.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.5]
      })
    })
  }

  render(){

  return(
    <Animated.View {...this._panResponder.panHandlers}style ={[styles.dateBar,{backgroundColor:this.props.colorTest, transform:[{translateX: this.state.translateX}],
          opacity: this.state.cardOpacity}]}>
      <View style ={styles.dateBarContent}>
      <ButtonWithBackground title={"back"} style={styles.buttonStyle} onPress={() => this.props.pressChange((this.props.title ==="Hour")?"h":"d","back")}><Icon name="md-arrow-round-back" size={15} color="black" /></ButtonWithBackground>
      <View style= {styles.datemiddle}>
        <Text>{this.props.title}</Text>
        <Text style={styles.dateText}>{this.props.prev}</Text>
      </View>
      <ButtonWithBackground title={"front"} style={styles.buttonStyle} onPress={() => this.props.pressChange((this.props.title ==="Hour")?"h":"d","front")}><Icon name="md-arrow-round-forward" size={15} color="black" /></ButtonWithBackground>
      </View>
      <View style ={styles.dateBarContent}>
      <ButtonWithBackground title={"back"} style={styles.buttonStyle} onPress={() => this.props.pressChange((this.props.title ==="Hour")?"h":"d","back")}><Icon name="md-arrow-round-back" size={15} color="black" /></ButtonWithBackground>
      <View style= {styles.datemiddle}>
        <Text>{this.props.title}</Text>
        <Text style={styles.dateText}>{this.props.content}</Text>
      </View>
      <ButtonWithBackground title={"front"} style={styles.buttonStyle} color={Colors.compound} onPress={() => this.props.pressChange((this.props.title ==="Hour")?"h":"d","front")}><Icon name="md-arrow-round-forward" size={15} color="black" /></ButtonWithBackground>
      </View>
      <View style ={styles.dateBarContent}>
      <ButtonWithBackground title={"back"} style={styles.buttonStyle} onPress={() => this.props.pressChange((this.props.title ==="Hour")?"h":"d","back")}><Icon name="md-arrow-round-back" size={15} color="black" /></ButtonWithBackground>
      <View style= {styles.datemiddle}>
        <Text>{this.props.title}</Text>
        <Text style={styles.dateText}>{this.props.next}</Text>
      </View>
      <ButtonWithBackground title={"front"} style={styles.buttonStyle} onPress={() => this.props.pressChange((this.props.title ==="Hour")?"h":"d","front")}><Icon name="md-arrow-round-forward" size={15} color="black" /></ButtonWithBackground>
      </View>
    </Animated.View>
)}
}
const styles = StyleSheet.create({
  dateContainer:{
    width:"100%",
    height:"100%",
    backgroundColor:"#fff",
    justifyContent:"center",
    alignItems: "center"
},
  dateText:{
    fontSize: 20,
    fontWeight:"bold",
    color: "black",
    letterSpacing: 1,
    fontFamily:"Roboto"
  },
  dateBar:{
    width:"300%",
    height:"50%",
    borderColor:Colors.primary,
    borderBottomWidth:0.3,
    flexDirection:"row",
    justifyContent:"center",
    alignItems: "center",
  },
  dateBarContent:{
    width:"33%",
    height:"100%",
    borderColor:Colors.primary,
    borderRightWidth:0.3,
    borderLeftWidth:0.3,
    flexDirection:"row",
    justifyContent:"center",
    alignItems: "center",
  },
  datemiddle:{
    justifyContent:"center",
    alignItems: "center"
  },
  buttonStyle:{
    width:"20%",
    height:"50%",
    padding: 10,
    margin:5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "black",
    justifyContent:"center",
    alignItems: "center",
    backgroundColor:"white"
  }

})
export default DateBar;
