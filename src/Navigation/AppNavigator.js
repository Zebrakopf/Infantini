import React from 'react'

import {createAppContainer, createDrawerNavigation} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Platform} from 'react-native'

import HomeScreen from '../Screens/Home/HomeScreen'
import LoggingScreen from '../Screens/Logging/LoggingScreen'
import DataScreen from '../Screens/Data/DataScreen'
import SettingsScreen from '../Screens/Settings/SettingsScreen'


import Ionicons from 'react-native-vector-icons/Ionicons'

import Colors from '../../constants/Colors'

const defaultNavigationOptions = ({navigation}) => ({
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
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName = 'md-analytics';
        if (routeName === 'Home') {
          iconName = `md-home`;

        } else if (routeName === 'Logging') {
          iconName = `md-create`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
      tabBarOptions: {
        activeTintColor: Colors.primary,
        inactiveTintColor: '#bbb',
        style:{borderWidth:0, borderColor:'#fff', backgroundColor:'#fff',borderTopColor: 'transparent'}
    },
    tabBarVisible:navigation.state.routeName === 'Settings' ? false : true
    })


    const HomeStack = createStackNavigator({
      Home: HomeScreen,
      Settings: SettingsScreen,
    },{
    headerMode: 'none',
  });

    const LoggingStack = createStackNavigator({
      Logging: LoggingScreen,
      Settings: SettingsScreen,
    },{
    headerMode: 'none',
  });
    const DataStack = createStackNavigator({
      Data: DataScreen,
      Settings: SettingsScreen,
    },{
    headerMode: 'none',
  });
const TabNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Logging: LoggingScreen,
  Data: DataScreen
},
{
defaultNavigationOptions: defaultNavigationOptions,
})
const AppNavigator = createStackNavigator({
  Main: TabNavigator,
  Settings: SettingsScreen,
},{
headerMode: 'none',
});

export default createAppContainer(AppNavigator);
