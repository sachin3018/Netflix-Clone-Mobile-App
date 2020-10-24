import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './Screens/Login';
import * as firebase from "firebase";
import Signup from './Screens/Signup';
import Subscription from './Screens/Subscription';
import Movies from './Screens/Movies';


const config = {
  apiKey: "AIzaSyDf4_j_a7-LAclzs9aP8saJPWbDcQw7Q34",
  authDomain: "netfilx-2f59a.firebaseapp.com",
  databaseURL: "https://netfilx-2f59a.firebaseio.com",
  projectId: "netfilx-2f59a",
  storageBucket: "netfilx-2f59a.appspot.com",
  messagingSenderId: "70707268328",
  appId: "1:70707268328:web:99811cb904695937e1975d",
  measurementId: "G-DC021427EB"
};
!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();


const stack = createStackNavigator();

const  App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator
        headerMode = {"none"}
      >
        <stack.Screen
          name="Login"
          component = {Login}
        />
        <stack.Screen
          name="Signup"
          component = {Signup}
        />
        <stack.Screen 
          name="Subscription"
          component={Subscription}  
        />
        <stack.Screen 
          name="Movies"
          component={Movies}  
        />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;