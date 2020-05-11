/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//https://itnext.io/react-native-why-you-should-be-using-redux-persist-8ad1d68fa48b    .....to see persist explanation
import React, {Fragment, useState, useEffect,Component} from 'react';
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
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

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

let customFonts = {
  'customIcons': require('./assets/fonts/icomoon.ttf'),
};

class App extends Component {
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
  state = {
   fontsLoaded: false,
 };
  async _loadFontsAsync() {
  await Font.loadAsync(customFonts);
  this.setState({ fontsLoaded: true });
}

componentDidMount() {
  this._loadFontsAsync();
}

render() {
  if (this.state.fontsLoaded) {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar  backgroundColor="#59C2D2" barStyle="light-content" hidden={false} translucent={false}/>
          <SafeAreaView style={{flex:1}}>
            <AppNavigator/>
          </SafeAreaView>
        </PersistGate>
      </Provider>
    );
  }
  return(
    <AppLoading />
    )
}
};


export default App;
