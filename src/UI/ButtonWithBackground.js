import React from 'react';

import {TouchableOpacity, Text, View, StyleSheet, TouchableNativeFeedback, Platform} from 'react-native';


const buttonWithBackground = props => {
  const onPress = () =>{
    props.onPress()
  }

const content = (    <View style={[styles.button, {backgroundColor: props.color}, props.disabled ? styles.disabled : null,{...props.style}]}>
      {props.children}
      </View>
    );

  if (props.disabled) {
    return content
  }
  if (Platform.OS ==="android") {
    return(
      <TouchableNativeFeedback onPress={onPress} style={{...props.style}} >
        {content}
      </TouchableNativeFeedback>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} style={{...props.style}}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderColor: "black"
  },
  disabled: {
    backgroundColor:"#eee",
    borderColor:"#aaa"
  },
  disabledText:{
    color:"#aaa"
  }
})

export default buttonWithBackground
