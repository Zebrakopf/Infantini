import React, {Component} from 'react'
import{View, Text, StyleSheet, Dimensions} from 'react-native'
import DataTemplate from '../../UI/DataScreens/DataTemplate'
import Header from '../../components/Header'
import moment from 'moment'
import BarAmounts from './BarGraph/BarAmounts'


class AmountLogged extends Component {

state = {
  amounts: null,
  ready: false

}
componentDidMount(){
this.setState({
  amounts: this.handleAmounts(this.handleData()),
  ready: true
})}

componentDidUpdate(nextProps){
  if (nextProps.data !== this.props.data){

  this.setState({
    amounts: this.handleAmounts(this.handleData())
  })}
}

  handleData = () => {
    let data = this.props.data.map(evt=>{
      return(
        {category: evt.category,
         tags: evt.tags}
      )
    })

    return data
  }

  handleAmounts = (data) =>{
    let info = [{category: 'Crying', amount: 0},
                  {category: 'Food', amount:0},
                  {category: 'Diapers', amount:0},
                  {category: 'Positives', amount:0},
                  {category: 'Soothing', amount:0},
                  {category: 'Sleeping', amount:0}]
    data.forEach(evt =>{
      info.forEach(obj =>{
        if(obj.category === evt.category){
          obj.amount = obj.amount + 1
        }
        else if(evt.category === 'Cry' && obj.category ==='Crying'){
          obj.amount = obj.amount +1
        }
        else if(evt.category === 'Sleep' && obj.category ==='Sleeping'){
          obj.amount = obj.amount +1
        }
      })
    })
    return info
    }


  // printInfo = () =>{
  //     let array = []
  //
  //     console.log("show data", Object.keys(this.state.amounts))
  //     Object.keys(this.state.amounts).forEach(key=>{
  //     console.log(this.state.amounts[key])
  //     array.push(<Text key={key}>{key} : {this.state.amounts[key]}</Text>)
  //   })
  //   return array
  // }
  render(){
  return(
    <DataTemplate title={"Amount Logged"} style={styles.information}>
      {this.state.ready === false ? null : <BarAmounts data={this.state.amounts} graphHeight = {this.props.graphHeight} graphWidth = {this.props.graphWidth} graphMargin={this.props.graphMargin}/>}
    </DataTemplate>
      )}
}

const styles = StyleSheet.create({

  information:{
    height:"80%",
    width:"90%",
    elevation:5,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"center"
  },
})
export default AmountLogged
