import React, {Component} from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  PanResponder,
  Dimensions,
} from 'react-native';


import Colors from '../../constants/EventColors'

export class PanEvent extends Component {
  constructor(props){
    super(props);

    let boxColor ="#fff"
    let size = this.props.Size
    switch(this.props.latestCategory){
      case "Cry":
          boxColor = Colors.cry.grumpy
        break
      case "Food":
          boxColor= Colors.food
        break
      case "Sleep":
          boxColor= Colors.sleep
        break
      case "Positives":
          boxColor= Colors.positives
        break
      case "Diapers":
          boxColor= Colors.diaper
        break
      case "Soothing":
          boxColor= Colors.soothing
        break

    }


    this.state = {
      showDraggable : true,
      pan: new Animated.ValueXY,
      color:boxColor,
      size:size
    };
    let mover =   Animated.event([
      null, { dx: this.state.pan.x, dy: this.state.pan.y }
    ])
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,

        onPanResponderMove: (event, gestureState) =>{

          if (this.isDropZone(gestureState, event)){
            this.props.infoHandler(event.nativeEvent.locationX, gestureState.moveX)}
          else{
              this.props.infoDisapper()
          }
          //  this.props.showTimeHandler(event.nativeEvent.locationX, event.nativeEvent.pageX)}
          return mover(event, gestureState)

          },

        onPanResponderRelease: (event, gestureState) => {
          console.log("When is this called")
          if (this.isDropZone(gestureState, event) && !this.props.checkForOverlap(event.nativeEvent.locationX, gestureState.moveX)){

            this.setState({
              showDraggable: false
            });

            this.props.infoDisapper()
            this.props.onVanish(event.nativeEvent.locationX, gestureState.moveX)
          }
          else {
              this.props.infoDisapper()
              Animated.spring(
              this.state.pan,{
                toValue:{x:0,y:0},
                useNativeDriver:true
              }).start();

          }
      }

      })
    }


  // ComponentDidUpdate(){
  //   switch(this.props.latestCategory){
  //     case "Cry":
  //       this.setState({
  //         color:"#009E95"
  //       })
  //       break
  //     case "Food":
  //       this.setState({
  //         color:"#6EE8FF"
  //       })
  //       break
  //     case "Sleep":
  //       this.setState({
  //         color:"#C264E8"
  //       })
  //       break
  //   }

  //}

  isDropZone(gesture, event){
    var width = Dimensions.get("window").width
    var dz = this.props.dropZoneValues;
    let leftMargin = (width - dz.width)/2
    let rightMargin = width - leftMargin + event.nativeEvent.locationX
    leftMargin = (width - dz.width)/2 + event.nativeEvent.locationX
    return (gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height && gesture.moveX > leftMargin);
  }
  render(){
    const Size = this.state.size

    if (!this.state.showDraggable){
      return null;
    }
    return (
      <View style={[styles.body,!this.props.tooBig ? {alignItems:"flex-start", paddingLeft:Dimensions.get("window").width*0.05} : {alignItems:"center" }]}>
            <Animated.View
              {...this.panResponder.panHandlers}
              style = {[this.state.pan.getTranslateTransform(), styles.box, {width: Size, backgroundColor: this.state.color}]}>


              </Animated.View>

        </View>
      );

};
};
let Size = 40;
const styles = StyleSheet.create({
  body: {
    position : 'absolute',
    height:"100%",
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
  },
  box: {
    backgroundColor: '#009E95',
    width: Size,
    height: Size/2,
    alignItems:"center",
    justifyContent:"center",
    elevation:3,
    borderRadius:3

  },
  text: {
    marginTop : 3,
    marginLeft : 5,
    marginRight : 5,
    textAlign : 'center',
    color : '#fff'
  }
});

export default PanEvent;
