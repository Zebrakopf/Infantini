/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//https://itnext.io/react-native-why-you-should-be-using-redux-persist-8ad1d68fa48b    .....to see persist explanation
import React, {Fragment, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage
} from 'react-native';

import {createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import eventsReducer from './src/store/reducers/events';
import tagsReducer from './src/store/reducers/tags';
import AppNavigator from './src/Navigation/AppNavigator'
import { persistStore, persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
  events: eventsReducer,
  tags: tagsReducer
  })

  // Middleware: Redux Persist Config
  const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage: AsyncStorage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
      'events',
      'tags'

    ],
    // Blacklist (Don't Save Specific Reducers)
    blacklist: [],
  };

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer)
// Middleware: Redux Persist Persister
let persistor = persistStore(store);


const App = () => {
  //persistor.purge()
  // console.log("cleared")
  //to clear async storage fully I have to relaod app once with this code running.. then close the app and reload it (with code running) one more time
  // [firstRender, handleFirstRender] = useState(true)
  // useEffect(()=>{
  //   if(firstRender){
  //     fetch('82.73.158.14')
  // .then((response) => {
  //    if (response.status === 200) {
  //      console.log('success');
  //    } else {
  //      console.log('error');
  //    }
  //  })
  // .catch((error) => {
  //      console.log('network error: ' + error);
  //  })
  //   }
  //   handleFirstRender(false)
  //
  //   },[])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={{flex:1}}>
          <StatusBar  backgroundColor="#59C2D2" barStyle="dark-content" hidden={true} translucent={false}/>
          <AppNavigator/>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};


export default App;
