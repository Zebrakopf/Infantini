import React from 'react'
import {View, StyleSheet,Dimensions} from 'react-native'
import { Svg, Defs, Circle, Rect, Path, LinearGradient, Text, Stop,Ellipse} from 'react-native-svg';
import Colors from '../../constants/Colors'


const FadeBackground = () =>{
  let height = Dimensions.get('window').height
  let width = Dimensions.get('window').width
  return(
    <View style={styles.container}>
      <Svg height={height} width={width } fill="none" viewBox={'0 0 '+ width.toString() + ' ' + height.toString()}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={Colors.primary} stopOpacity="1" />
            <Stop offset="1" stopColor="#fff" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0"    y="0"    width={width}    height={height}    fill="url(#grad)" />

        <Rect x="0"    y="0"    width={width}    height={0}    fill={Colors.primary} />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    position:'absolute',
    opacity:100
  }
})
export default FadeBackground
