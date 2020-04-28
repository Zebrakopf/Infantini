import React, {useState} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import Colors from '../../../constants/Colors'
import Header from "../../components/Header"
import {connect } from 'react-redux';
import * as eventActions from '../../store/actions/events'
import * as tagActions from '../../store/actions/tags'
import SettingsItem from './SettingsItem'
import DeleteConfirmModal from '../../UI/DeleteConfirmModal'

const SettingsScreen = (props) =>{
  const [confirmModalActive, handleConfirmModal] = useState(false)

  const openModal = () =>{
    handleConfirmModal(true)
  }
  const hideModal = () =>{
    handleConfirmModal(false)
  }
  return(
    <View style={styles.container}>
    <Header backButton={true} title={"Settings"} refresh={()=>{}} events={props.events} onOptions={() => {props.navigation.pop()}} onClose={props.navigation.navigate}/>
      <View style={styles.contentContainer}>
        <SettingsItem description={'delete all your custom tags'} onPress={openModal}/>
        <Text>SettingsScreen</Text>
      </View>
      <DeleteConfirmModal onCancel={hideModal} onDelete={props.onRevertTags} active={confirmModalActive} settings={true} />
    </View>
  )
}

SettingsScreen.navigationOptions = navData =>{
  return{
  tabBarVisible:false,
}
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start'
  },
  contentContainer:{
    height:"100%",
    width:'100%',
    alignItems:'center',
    justifyContent:'flex-start',
    backgroundColor:"#fff"
  }
})
const mapStateToProps = state => {
  return {
    events: state.events.allEvents
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAddEvent: (category, start, duration, qualifier, description, size, timeStamp) => dispatch(eventActions.addEvent(category, start, duration, qualifier, description, size, timeStamp)),
    onDeleteEvent: (id) => dispatch(eventActions.deleteEvent(id)),
    onRevertTags: ()=> dispatch(tagActions.revertTags())
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
