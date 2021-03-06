import React, {Component} from 'react'
import{View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native'
import DataTemplate from '../../UI/DataScreens/DataTemplate'
import Header from '../../components/Header'
import AmountLogged from './AmountLogged'
import Colors from '../../../constants/Colors'
import moment from 'moment'
import {connect} from 'react-redux';
import CircleMenue from '../../components/circleMenue'
import EventModal from '../../UI/InfoInputModal/UpdatedModal/EventModal'
import CryIntensity from '../../UI/InfoInputModal/UpdatedModal2/CryIntensity'

const height = Dimensions.get("window").height
const width = Dimensions.get("window").width

class DataScreen extends Component {

  render(){
    const filterSelector = null
    // (
    //   <View style={styles.filterContainer}>
    //     <View style={styles.filter}>
    //     </View>
    //   </View>)
    let focus = this.props.navigation.isFocused()
    console.log('rerender datascreen')
    if(focus){
      return(

      <View style={styles.container}>
        <Header backButton={false} title={"Data"} onNavigate={this.props.navigation.navigate}/>
        <View style={[styles.container,{flex:0, height: "92%", width:"100%" }]}>
          <ScrollView  horizontal disableIntervalMomentum style={styles.scroller} contentContainerStyle={{alignItems:"center", justifyContent:"center"}} snapToInterval={Dimensions.get("window").width*0.9}>
            <View style={[styles.TemplateContainer,{justifyContent:'center',backgroundColor:'transparent'}]}>
              {filterSelector}
              <DataTemplate title={"See Data"} style={styles.information}>
              </DataTemplate>
            </View>
            <View style={[styles.TemplateContainer, {padding:0}]}>
              <DataTemplate title={"More Data"} style={styles.information}>
              </DataTemplate>
            </View>
            <View style={styles.TemplateContainer}>
                <AmountLogged data={this.props.events} graphHeight={height*0.6} graphWidth={width*0.8} graphMargin={width*0.05}/>
            </View>
            <View style={styles.TemplateContainer}>
              <DataTemplate title={"Still More"} style={styles.information}>
              </DataTemplate>
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }else{
    return null
  }
}}

const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    flex:1,
    alignItems:"center",
    justifyContent:"center"
  },
  information:{
    height:"80%",
    width:"90%",
    elevation:5,
    backgroundColor:"#fff",
    alignItems:"center",
    justifyContent:"flex-start"
  },
  scroller:{
    height:"80%",
    width:"90%",
    backgroundColor:"#fff",
  },
  TemplateContainer:{
    height:Dimensions.get("window").height * 0.8,
    width:Dimensions.get("window").width * 0.9,
    paddingLeft:2,
    paddingRight:2,
    alignItems:"center",
    justifyContent:"center"
  },
  filterContainer:{
    width:'90%',
    height:'15%',
    backgroundColor:'blue',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  filter:{
    width: '30%',
    height:20,
    backgroundColor: Colors.primary
  }
})


const mapStateToProps = state => {
  return {
    events: state.events.allEvents
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAddTag: (name, category) => dispatch(tagActions.addTag(name, category)),
    onDeleteTag: (name, category) => dispatch(tagActions.deleteTag(name, category))
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(DataScreen);
