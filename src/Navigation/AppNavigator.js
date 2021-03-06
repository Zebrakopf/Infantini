import React from 'react'
import {Easing} from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TransitionSpecs } from '@react-navigation/stack'
import {Platform} from 'react-native'

import HomeScreen from '../Screens/Home/HomeScreen'
import LoggingScreen from '../Screens/Logging/LoggingScreen'
import DataScreen from '../Screens/Data/DataScreen'
import SettingsScreen from '../Screens/Settings/SettingsScreen'
import DateRangeInput from '../components/DateModal/DateRangeInput'
import EventModal from '../UI/InfoInputModal/UpdatedModal2/EventModal_nav'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Colors from '../../constants/Colors'

const defaultNavigationOptions = ({route}) => ({
    headerStyle:{
      backgroundColor: Colors.primary
    },
    headerTitleStyle:{
      fontFamily:"Roboto",
      color:'white'
    },
    headerBackTitleStyle:{
      fontFamily:"Roboto"

    },
    headersTintColor:Platform.OS === 'android' ? 'white' : Colors.primary,
    tabBarIcon: ({ focused, horizontal, color }) => {
        const  routeName  = route.name;
        let IconComponent = Ionicons;
        let iconName = 'md-analytics';
        if (routeName === 'Home') {
          iconName = `md-home`;

        } else if (routeName === 'Logging') {
          iconName = `md-create`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={color} />;
      },

    tabBarVisible:route.name === 'Settings' ? false : true,
    })



//----------------------------------------------------------------------------
const BottomTabNavigator = createBottomTabNavigator() //for screens
const RootStack = createStackNavigator()//for modals and settings
function BottomTabScreens(props) {
  return(
      <BottomTabNavigator.Navigator screenOptions={defaultNavigationOptions} tabBarOptions= {{
        activeTintColor: Colors.primary,
        inactiveTintColor: '#bbb',
        style:{borderWidth:0, borderColor:'#fff', backgroundColor:'#fff',borderTopColor: 'transparent', elevation:0,zIndex:-1},
        keyboardHidesTabBar:false
    }}>
        <BottomTabNavigator.Screen name="Home" component={HomeScreen} />
        <BottomTabNavigator.Screen name="Logging" component={LoggingScreen}/>
        <BottomTabNavigator.Screen name="Data" component={DataScreen} />
      </BottomTabNavigator.Navigator>
  )
}

const config = {
  animation: 'timing',
  config: {
    duration:500,
    easing:Easing.linear
  },
};

function AppNavigator(props) {
return(
  <NavigationContainer>
    <RootStack.Navigator screenOptions={{
          gestureEnabled:true,
          gestureDirection:'vertical',
          transitionSpec:{
            open:TransitionSpecs.TransitionIOSSpec,
            close:TransitionSpecs.TransitionIOSSpec
          },
          cardStyle: { backgroundColor: 'transparent' },
          cardOverlayEnabled: true,

        }}
      mode="modal"
      headerMode="none">
      <RootStack.Screen name="Tabs" component={BottomTabScreens} screenOptions={defaultNavigationOptions}/>
      <RootStack.Screen name="DateInput" component={DateRangeInput} screenOptions={defaultNavigationOptions}/>
      <RootStack.Screen name="Settings" component={SettingsScreen} screenOptions={defaultNavigationOptions}/>
      <RootStack.Screen name="LoggingModal" component={EventModal} screenOptions={defaultNavigationOptions}/>
    </RootStack.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigator;
//----------------------------------------------------------------------------
