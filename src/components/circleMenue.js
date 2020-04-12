import React, {Component} from 'react'
import {Dimensions} from 'react-native'
import CircleMenu from './circleMenu'
import Colors from '../../constants/EventColors'

import MainColors from '../../constants/Colors'

class CircleMenue extends Component {
    items = [
      {
        name: 'md-sad',
        color: Colors.cry.grumpy,
        title:'Cry'
      },
      {
        name: "md-bed",
        color: Colors.sleep,
        title:'Sleep'
      },
      {
        name: 'md-restaurant',
        color: Colors.food,
        title:'Food'
      },
      {
        name: 'md-happy',
        color: Colors.positives,
        title:'Positives'
      },
      {
        name: 'md-mic-off',
        color: Colors.soothing,
        title:'Soothing'
      },
      {
        name: 'md-planet',
        color: Colors.diaper,
        title:'Diaper'
      }
    ];

    onPress = index => {
      if(index ==='close'){
        this.props.onSelect("Close")
        return null
      }
      switch(this.items[index].name){
        case 'md-sad':
          this.props.onSelect("Cry")
          break;
        case "md-bed":
          this.props.onSelect("Sleep")
          break;
        case 'md-restaurant':
          this.props.onSelect("Food")
          break;
        case 'md-happy':
          this.props.onSelect("Positives")
          break;
        case 'md-happy':
          this.props.onSelect("Diapers")
          break;
        case 'md-planet':
          this.props.onSelect("Diapers")
          break;
        case 'md-mic-off':
          this.props.onSelect("Soothing")
          break;
      }
    }

    render() {
      let height = Dimensions.get('window').height
      let width = Dimensions.get('window').width
      console.log(height, width)
    	return <CircleMenu
            bgColor={MainColors.primary}
            items={this.items}
            onPress={(index) => {this.onPress(index)}}
            itemSize={height < 600 ? 60 :this.props.itemSize}
            radius={height < 600 ? 120 : this.props.radius}
        />
    }
}

export default CircleMenue
