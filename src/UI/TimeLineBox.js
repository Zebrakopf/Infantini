import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';


export class TimeLineBox extends Component {
  constructor(props){
    super(props);

    this.state = {
      showDraggable : true,
    };
}


  render(){
    const Size = this.props.Size
    const text = this.props.titleText
    if (!this.state.showDraggable){
      return null;
    }
    return (
            <TouchableOpacity  style = {[ styles.box, {width: this.props.Size, height: this.props.dropZoneHeight/4, marginLeft:this.props.Position/60*this.props.dropZoneWidth, backgroundColor:this.props.boxColor}]}
                                onLongPress={()=>{alert("longpress")}}>
                <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
      );

};
};
let Size = 40;
const styles = StyleSheet.create({
  box: {
    backgroundColor: '#009E95',
    width: Size,
    height: Size/2,
    alignItems:"center",
    justifyContent:"center",
    elevation:3,
    borderRadius:3,
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

export default TimeLineBox;
