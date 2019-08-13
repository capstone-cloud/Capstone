import React from "react";
import { StyleSheet, Text, View } from "react-native";


import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUp from './SignUp';
import Loading from './Loading';
import LogIn from './Login';
import UserPage from './UserPage';
import Groups from './Groups'
import AddGroupForm from './AddGroupForm';
import Events from "./Events";
import AddEventForm from "./AddEventForm"
import Items from "./Items"

const MainNavigator = createStackNavigator({
  Loading: { screen: Loading },
  Signup: { screen: SignUp },
  Login: { screen: LogIn },
  UserPage: { screen: UserPage },
  Groups: { screen: Groups },
  AddGroupForm: {screen: AddGroupForm},
  Events: { screen: Events },
  AddEventForm: {screen:AddEventForm},
  Items: {screen: Items}
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "pink"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);


const App = createAppContainer(MainNavigator);

export default App;
