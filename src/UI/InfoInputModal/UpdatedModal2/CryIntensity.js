import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Slider
} from 'react-native';


import Colors from '../../../../constants/Colors'

const INTENSITIES = ["default0","default1","default2","default4"]

export class CryIntensity extends Component {
  state = {
    value:"please Select"
  }
  onValueChange = (value) =>{
    this.setState({
      value:value
    })
  }
  onComplete = (value) => {
      this.props.onChange(this.state.value)
  }
  render(){
    const HEIGHT = 50
    let trackWidth=100
    return (
      <View style={styles.body}>
            <View style={styles.horizontal}>
              <Text>{this.state.value}</Text>
            </View>
            <View style={{width: '120%', height: 20, backgroundColor:"#fff", alignItems:"center", justifyContent:"space-between", flexDirection:"row"}}>
              <View style={{width:'50%', height:20, backgroundColor:"#fff", alignItems:"center", justifyContent:"flex-start", flexDirection:"row"}}><Text>Fussy</Text></View>
              <View style={{width:'50%', height:20, backgroundColor:"#fff", alignItems:"center", justifyContent:"flex-end", flexDirection:"row"}}><Text>Unconsolable</Text></View>
            </View>
            <View style={{width: '110%', height: HEIGHT, backgroundColor:"#fff", alignItems:"center", justifyContent:"space-between", flexDirection:"row"}}>
              <View style={{width: '90%', height: 10, backgroundColor:"#fff", position:'absolute',marginLeft:'5%', borderWidth:0.5, borderRadius:100, backgroundColor:Colors.compound}}/>
              <Slider style={{width: '100%', height: HEIGHT}}
                  minimumValue={1}
                  step={1}
                  maximumValue={10}
                  minimumTrackTintColor="#fff"
                  thumbTintColor={Colors.primary}
                  onSlidingComplete={this.onComplete}
                  onValueChange={value => this.onValueChange(value)}
                  maximumTrackTintColor="#fff"/>
            </View>
            <View style={{width: '110%', height: 10, backgroundColor:"#fff", alignItems:"center", justifyContent:"space-between", flexDirection:"row"}}>
              <View style={{width:'50%', height:10, backgroundColor:"#fff", alignItems:"center", justifyContent:"flex-start", flexDirection:"row"}}><Text>1</Text></View>
              <View style={{width:'50%', height:10, backgroundColor:"#fff", alignItems:"center", justifyContent:"flex-end", flexDirection:"row"}}><Text>10</Text></View>
            </View>
      </View>
      );

};
};

//
let Size = 40;
const styles = StyleSheet.create({
  body: {
    height:"100%",
    width:"100%",
    alignItems:"center",
    justifyContent:"flex-start",
    marginTop:'30%'
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
  horizontal:{
    height:"20%",
    width:"80%",
    alignItems:"center",
    justifyContent:"center",
  },
  text: {
    marginTop : 3,
    marginLeft : 5,
    marginRight : 5,
    textAlign : 'center',
    color : '#000'
  }
});

export default CryIntensity;
