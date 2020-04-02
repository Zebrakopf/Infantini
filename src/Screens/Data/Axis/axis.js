import React, { Component} from 'react'
import { G, Line, Path, Rect, Text} from 'react-native-svg'
import * as d3scale from 'd3-scale'


const axis = (props) =>{


const  scalePoints = () => {
    var {xScale, dataPoints } = props
    var points = []
    if(props.vertical){
      dataPoints.sort((a,b) => b-a)
    }
    for(var i = 0 ; i <= dataPoints.length - 1; i++){
      points.push(xScale(dataPoints[i]))
    }
    return{points: points}
  }
const  getPath = () => {
    var {curveOffsetTop, outerTick, innerTick } = props
    var path = 'M'+props.leftMargin.toString()+','+ curveOffsetTop.toString() +' '
    var points = scalePoints()
    if(!props.vertical){
      for (var i = 0; i <= points.points.length - 1; i++){
        path = path + 'H' + points.points[i].toString()+' '
        path = path + 'v'+ outerTick.toString()+' '
        path = path + 'v-'+ outerTick.toString()+' '
        path = path + 'v-'+ innerTick.toString()+' '
        path = path + 'v'+ innerTick.toString()+' '
      }
    }else{
      for (var i = 0; i <= points.points.length - 1; i++){
        path = path + 'V' + points.points[i].toString()+' '
        path = path + 'h'+ outerTick.toString()+' '
        path = path + 'h-'+ outerTick.toString()+' '
        path = path + 'h-'+ innerTick.toString()+' '
        path = path + 'h'+ innerTick.toString()+' '
    }
  }
    return {path: path}
  }
const finalPath = getPath()
  return(
    <Path d={finalPath.path} stroke={props.color} strokeWidth={props.strokeWidth} />
  )
}

export default axis
