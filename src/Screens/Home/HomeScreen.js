import React, {Component} from 'react'
import {View, FlatList,Text, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native'
import moment from 'moment'
import ListItem from '../../components/listItem/listItem'
import Colors from '../../../constants/Colors'
import Header from "../../components/Header"
//import 'moment/locale/de' for german dates use moment().locale('de')
import logo from '../../Assets/InfantiniBackground.png'

import {connect } from 'react-redux';
import * as eventActions from '../../store/actions/events'

const times = ['24:00 - 01:00','01:00 - 02:00','02:00 - 03:00','03:00 - 04:00','04:00 - 05:00','05:00 - 06:00','06:00 - 07:00','07:00 - 08:00','08:00 - 09:00','09:00 - 10:00','10:00 - 11:00','11:00 - 12:00',
'12:00 - 13:00','13:00 - 14:00','14:00 - 15:00','15:00 - 16:00','16:00 - 17:00','17:00 - 18:00','18:00 - 19:00','19:00 - 20:00','20:00 - 21:00','21:00 - 22:00','22:00 - 23:00','23:00 - 24:00']



class HomeScreen extends Component {
  constructor(props){
    super(props)
  this.state={
    refresh:false,
    times: [...times],
    now: moment().add(moment().utcOffset(),'m').minutes(0)
  }
}
  componentDidMount(){
    this.props.onDayChange(moment())
    this._unsubscribe = this.props.navigation.addListener(
            'focus',
            payload => {
              this.props.onDayChange(moment());
            })
  }
  componentDidUpdate(previousProps, previousState){
    let index = 23// moment().get('hour') >= 3 ? moment().get('hour')-3 : 0
    setTimeout(
        () => { this.FlatList.scrollToEnd({animated: true})},
        2000
      )
      if(this.props.events !== previousProps.events){
      this.refresh()}
  }
  refresh = () =>{
    this.setState(prevState => ({
       ...prevState,
     refresh:!prevState.refresh,
     times: [...prevState.times]
    }))
  }
  componentWillUnmount(){
    this._unsubscribe()
  }
  //initialScrollIndex={moment().get('hour')-3}
  render(){
    return(
        <View style={styles.container} onLayout={()=>{this.refresh()}}>
        <Header backButton={false} title={"Home"} refresh={this.refresh}  onNavigate={this.props.navigation.navigate}/>
        <View style = {styles.elenaContainer}>
          <Text style={styles.titleText}>The Last 24 hours</Text>
        </View>
        <View style = {styles.infoContainer}>
            <View style= {styles.infoScroller}>
              <View style= {styles.scrollview}>
              <FlatList style={{height:"100%", width:"100%"}}
              data={times}
              renderItem={({item, index}) => <ListItem text={item} time={this.state.now.clone()} refresh={this.state.refresh} key={index} index={index} events={this.props.events} onPress={(moment)=>{console.log(moment)
                                                                                                                          this.props.navigation.navigate('Logging',{index:moment})}}/>}
              keyExtractor={(item, index) => index.toString()}
              getItemLayout={(data, index) =>( {length: 80, offset: 80 * index, index: index}) }
              ref={(ref) => { this.FlatList = ref; }}
              extraData={this.props}/>
              </View>
            </View>
        </View>
        <Image style={styles.image} source={logo} resizeMode={"contain"} fadeDuration={0}/>
        </View>


    )
  }
}

// <FlatList style={{height:"100%", width:"100%"}}
// data={[{key: 'a'}, {key: 'b'},{key: 'c'},{key: 'd'},{key: 'e'},{key: 'f'},{key: 'g'},{key: 'j'}]}
// renderItem={({item}) => <ListItem/>}/>


const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"flex-start",
    alignItems: "center",
    backgroundColor:"#fff"
  },
  infoContainer:{
    width:"100%",
    height:"85%",
    backgroundColor:"#fff",
    flexDirection:"column",
    justifyContent:"flex-start",
    alignItems: "center"

  },
  image:{
    height:'22%',
    width:'22%',
    position:'absolute',
    top:Dimensions.get("window").height*-0.035
  },
  infoScroller:{
    width:"95%",
    height:"90%",
    //borderWidth:1,
    //borderColor:"#aaa",
    marginLeft:8,
    marginRight:8,
    justifyContent:"center",
    alignItems: "center",
    //backgroundColor:"#83D3B4",
    // borderColor:Colors.compound,
    // borderRadius:5,
    // borderWidth:0.5
  },
  scrollview:{
    width:"98%",
    height:"100%",
    justifyContent:"center",
    alignItems: "center",
    padding:1
  },
  titleText:{
    fontSize:20,
    fontWeight:"bold",
    color: Colors.compound
  },
  elenaContainer:{
    width:"100%",
    height:"15%",
    backgroundColor:"#fff",
    flexDirection:"column",
    justifyContent:"flex-end",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor:'#eee',
    paddingBottom:2
  }

})
const mapStateToProps = state => {
  return {
    events: state.events.todaysEvents ? state.events.todaysEvents : state.events.allEvents
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAddEvent: (category, start, duration, qualifier, description, size, timeStamp) => dispatch(eventActions.addEvent(category, start, duration, qualifier, description, size, timeStamp)),
    onDeleteEvent: (id) => dispatch(eventActions.deleteEvent(id)),
    onDayChange : (day) => dispatch(eventActions.updateCurrentEvents(day))
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
