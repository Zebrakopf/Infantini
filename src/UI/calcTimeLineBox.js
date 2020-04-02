import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import * as scale from 'd3-scale'




export class CalcTimeLineBox extends Component {
  constructor(props){
    super(props);

    this.state = {
      showDraggable : true,
    };
}


  render(){
    const timeScale = scale.scaleLinear()
                .domain([0,60])
                .range([0, this.props.dropZoneWidth])
    const Size = this.props.Size
    const text = this.props.titleText
    if (!this.state.showDraggable){
      return null;
    }
    if (this.props.asleepDuration){
      let asleepDuration = this.props.asleepDuration[this.props.asleepDuration.length-1].fallAsleepDuration
      console.log("duration:", this.props.duration - asleepDuration)
      return(
        <TouchableOpacity  style = {[ styles.boxContainer, {width: timeScale(this.props.duration), height: this.props.dropZoneHeight/4, marginLeft:timeScale(this.props.Position)}]}
                            onLongPress={()=>{this.props.deleteEvent(this.props.id)}}>
            <View style={{width: timeScale(asleepDuration), height: this.props.dropZoneHeight/4, borderLeftWidth:1, borderColor:"black",justifyContent:'center'}}>
              <View style={{width: timeScale(asleepDuration), height: 2, backgroundColor:this.props.boxColor}}/>
            </View>
            <View style={[ styles.box, {width: timeScale(this.props.duration-asleepDuration), height: this.props.dropZoneHeight/4, backgroundColor:this.props.boxColor}]}>
              <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
      )
    }
    return (
            <TouchableOpacity  style = {[ styles.box, {width: timeScale(this.props.duration), height: this.props.dropZoneHeight/4, marginLeft:timeScale(this.props.Position), backgroundColor:this.props.boxColor}]}
                                onLongPress={()=>{this.props.deleteEvent(this.props.id)}}>
                <Text style={[styles.text,{fontSize:this.props.duration < 10 ? 5 : 12}]}>{text}</Text>
        </TouchableOpacity>
      );

};
};
let Size = 40;
const styles = StyleSheet.create({
  box: {
    width: Size,
    height: Size/2,
    alignItems:"center",
    justifyContent:"center",
    elevation:3,
    borderRadius:3,
    position:'absolute'

  },
  boxContainer: {
    width: Size,
    height: Size/2,
    flexDirection:'row',
    alignItems:"flex-start",
    justifyContent:"flex-start",
    position:"absolute",

  },
  text: {
    marginTop : 3,
    marginLeft : 5,
    marginRight : 5,
    textAlign : 'center',
    color : '#fff',
    fontWeight:"bold",
    fontSize:12,
    fontFamily:"Roboto"
  }
});

export default CalcTimeLineBox;
