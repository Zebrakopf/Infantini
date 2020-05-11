import React, {Component} from 'react'
import {View, TouchableWithoutFeedback, Animated, Platform, Text} from 'react-native'
import * as Font from 'expo-font'
import Icon from 'react-native-vector-icons/Ionicons'
import CustomIcon from '../../../Assets/CustomIcon'

import constants from '../constants'

const styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default class extends Component {


  static defaultProps = {
    afterAnimation() {},
    backgroundColor: '#FFF',
    buttonSize: constants.BUTTON_SIZE,
    duration: 1,
    iconSize: 25,
    title:'cry',
    onPress() {}
  };

  state = {
    animation: new Animated.Value(0)
  };

  render() {
    const {
      afterAnimation,
      backgroundColor,
      buttonSize,
      color,
      duration,
      icon,
      iconSize,
      onPress,
      title
    } = this.props;

    let size = buttonSize;

    if (Platform.OS === 'ios') {
      size += 1;
    }
    return <TouchableWithoutFeedback
      style={{
        height: buttonSize,
        position: 'relative',
        width: buttonSize
      }}
      onPress={() => {
        onPress();

        if(Platform.OS === 'ios') {
          Animated.timing(this.state.animation, {
            duration,
            toValue: 1
          }).start(() => {
            this.state.animation.setValue(0);
            afterAnimation()
          })
        } else {
          afterAnimation()
        }
      }}
    >
      <Animated.View style={[styles.container, {
        backgroundColor: 'transparent',
        borderColor: '#FFF',
        borderRadius: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [buttonSize / 2, buttonSize]
        }),
        borderWidth: this.state.animation.interpolate({
          inputRange: [0, .1, 1],
          outputRange: [0, buttonSize / 2, 0]
        }),
        height: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [buttonSize, buttonSize * 2]
        }),
        left: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -buttonSize / 2]
        }),
        position: 'absolute',
        top: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -buttonSize / 2]
        }),
        width: this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [buttonSize, buttonSize * 2]
        })
      }]}>
        <View style={[styles.container, {
          backgroundColor,
          borderColor: 'transparent',
          borderRadius: buttonSize,
          height: size,
          paddingTop: Platform.OS === 'ios' ? 2 : 0,
          paddingLeft: Platform.OS === 'ios' ? 1 : 0,
          width: size,
          justifyContent:"center",
          alignItems:"center",
        }]}>

        {  icon == "md-add" || icon == "md-close" ?<Icon
            color={color || '#FFF'}
            name={icon}
            size={iconSize}
          />
          :
          <CustomIcon
              color={color || '#FFF'}
              name={icon}
              size={iconSize}
            />
          }

          {title === '' ? null : <Text style={{  color:"white",fontFamily:"Roboto", fontSize:12}}>{title}</Text>}
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  }
}
