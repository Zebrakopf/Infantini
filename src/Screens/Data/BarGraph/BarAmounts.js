import Svg, { Circle, Rect, Path, LinearGradient, Text, Stop } from 'react-native-svg';
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import * as scale from 'd3-scale'
import * as d3 from 'd3-scale-chromatic'
import * as colorCon from 'd3-color'
import Axis from '../Axis/axis'


const Window = Dimensions.get("window")
const margin = Window.width*0.2
const size = Window.height*0.6
const windowWidth = Window.width
//data format for the component
// const data = [{category: 'Crying', amount: 30},
//               {category: 'Food', amount:20},
//               {category: 'Diapers', amount:25},
//               {category: 'Positives', amount:10},
//               {category: 'Soothing', amount:40},
//               {category: 'Sleeping', amount:45}]

const getTickPoints =  (vertical, start, end, numTicks) => {
  let res = []
  let ticksEvery = Math.floor( start/ (numTicks - 1))
  if (vertical) {
    for (let cur = start; cur >= end; cur -= ticksEvery) res.push(cur)
  } else {
    for (let cur = start; cur <= end; cur += ticksEvery) res.push(cur)
  }
  return res
}

const plotBars = (scaleX, scaleY, yValues, xValues, xRange, graphHeight, graphMargin) =>{
  let res = []
  let barHeight = 0
  let color = ''

let  colorScale = scale.scaleLinear()
                .domain([0,Math.max(...yValues)])
                .range([0.3,0.8])
//#59C2D2
//d3.interpolateBlues(colorScale(yValues[1]))
  //const barWidth = (Window.width - margin) / xValues.length - 11
  let barWidth = scaleX(3)-scaleX(2)
  barWidth -= barWidth*0.04
  xValues = xValues.sort((a,b) => a-b)
  yValues = yValues.sort((a,b) => a-b)
  for (let i = 0 ; i <= xValues.length -1; i++){
    barHeight = scaleY(yValues[i])
    color = colorCon.rgb(d3.interpolateBlues(colorScale(yValues[i]))).formatHex()
    res.push(<Rect x={scaleX(xRange[i]) + barWidth*0.02} y={graphHeight - barHeight - graphMargin} width={barWidth} height={barHeight}  fill={color} key={i+1}/>)
    res.push(<Text x={scaleX(xRange[i]) + ( xValues[i].length <= 7 ? 8 : 2)} y={graphHeight - graphMargin + 10} fontSize="8"  fill={"#000"} key={((i+1)*10)}>{xValues[i]}</Text>)}
  return res
}

const amountOfXValues = (xValues) =>{
  let res = []
  for (let i = 0 ; i <= xValues.length; i++){
    res.push(i)
  }
  return res
}

const yAxisValues = (scaleY, yValues, graphMargin) =>{
  let res = []
  let valueHeight = 0

  yValues = yValues.sort((a,b) => a-b)

  for (let i = 0 ; i <= yValues.length -1; i++){
    valueHeight = scaleY(yValues[i]) + 3
    res.push(<Text x={graphMargin-11} y={valueHeight} fontSize="8"  fill={"#000"} key={i*10} textAnchor = {"middle"}>{yValues[i]}</Text>)}
  return res
}

const BarAmounts = (props) => {
  const data = props.data.sort((a,b) => a.amount-b.amount)
  const xValues = data.map(obj => obj.category)
  const yValues = data.map(obj => obj.amount)
  const xRange = amountOfXValues(xValues)
  const maxY = Math.max(...yValues) > 10 ? Math.max(...yValues) : 10
  const x = scale.scaleLinear()
              .domain([0,Math.max(...xRange)+1])
              .range([props.graphMargin , props.graphWidth ])
  const y = scale.scaleLinear()
              .domain([maxY,0])
              .range([props.graphHeight - props.graphMargin*4, props.graphMargin ]) //where the 4 sits I can shrink the graph. 2 would be default...
  const yAxis = scale.scaleLinear()
              .domain([maxY,0])
              .range([props.graphMargin*3,props.graphHeight - props.graphMargin])//where the 3 sits I can shrink the axis. 2 would be default...

  //const ticksY = getTickPoints(1, Math.max(...props.yValues), 0, 4)
  //ticksY.push(Math.max(...props.yValues))
  const bars = plotBars(x, y, yValues, xValues, xRange, props.graphHeight, (props.graphMargin))
  const yAxisVal = yAxisValues(yAxis, yAxis.ticks(), props.graphMargin)


  return(
    <View style={[styles.container, { marginLeft:props.graphMargin}]}>
      <Svg height={props.graphHeight} width={props.graphWidth } fill="none" viewBox={'0 0 '+props.graphWidth.toString() + ' ' + props.graphHeight}>
        <Rect x="0" y="0" width={props.graphWidth} height={props.graphHeight} fill="none" />
        {bars}
        {yAxisVal}
        <Axis dataPoints={xRange}  xScale={x} curveOffsetTop = {props.graphHeight - props.graphMargin} outerTick = {0} innerTick = {5} leftMargin={props.graphMargin} color={"#bbb"} strokeWidth={1}/>
        <Axis dataPoints={yAxis.ticks()}  xScale={yAxis} curveOffsetTop = {props.graphHeight - props.graphMargin} outerTick = {3} innerTick = {2} leftMargin={props.graphMargin} color={"#bbb"} strokeWidth={1} vertical/>
      </Svg>
    </View>
  )
}
//        <Axis x="0" y="12" width={Window.width - margin} startVal="0" endVal="60" scale={scale.scaleLinear}/>

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignContent:"center",
    alignItems:"center",
    justifyContent:"flex-end"
  },
})


 export default BarAmounts
