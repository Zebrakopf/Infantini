import React, {Component} from 'react'
import {Dimensions} from 'react-native'
import CircleMenu from './circleMenu'
import Colors from '../../constants/EventColors'
import CustomIcon from '../Assets/CustomIcon.js'

import MainColors from '../../constants/Colors'

class CircleMenue extends Component {
    items = [
      {
        name: 'weinen-infantino-02',
        color: Colors.cry.grumpy,
        title:'Cry'
      },
      {
        name: "Schlafen-infantino-02",
        color: Colors.sleep,
        title:'Sleep'
      },
      {
        name: 'essen-infantino-02',
        color: Colors.food,
        title:'Food'
      },
      {
        name: 'positiv-infantino-02',
        color: Colors.positives,
        title:'Positives'
      },
      {
        name: 'beruhigen-infantino-02',
        color: Colors.soothing,
        title:'Soothing'
      },
      {
        name: 'windel-infantino-02',
        color: Colors.diaper,
        title:'Diapers'
      }
    ];

    onPress = index => {
      if(index ==='close'){
        this.props.onSelect("Close")
        return null
      }
      switch(this.items[index].title){
        case 'Cry':
          this.props.onSelect("Cry")
          break;
        case "Sleep":
          this.props.onSelect("Sleep")
          break;
        case 'Food':
          this.props.onSelect("Food")
          break;
        case 'Positives':
          this.props.onSelect("Positives")
          break;
        case 'Diapers':
          this.props.onSelect("Diapers")
          break;
        case 'Soothing':
          this.props.onSelect("Soothing")
          break;
      }
    }

    render() {
      let height = Dimensions.get('window').height
      let width = Dimensions.get('window').width
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
