import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";
import SignUp from "./SignUp";
import Loading from "./Loading";
import LogIn from "./Login";
import UserPage from "./UserPage";
import Events from "./Events";

const MainNavigator = createStackNavigator(
  {
    Loading: { screen: Loading },
    Signup: { screen: SignUp },
    Login: { screen: LogIn },
    UserPage: { screen: UserPage },
    Events: { screen: Events }
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
