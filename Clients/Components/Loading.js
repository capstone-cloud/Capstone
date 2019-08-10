import React, { Component } from "react";
import { Text, View, Button } from "react-native";

import styles from "./Style";

export default class Loading extends Component {
  static navigationOptions = {
    title: "Welcome"
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Splitzies!</Text>
        <Button
          style={styles.button}
          color="yellow"
          title="Log In"
          onPress={() => navigate("Login")}
        />
        <Button
          style={styles.button}
          color="yellow"
          title="Sign Up"
          onPress={() => navigate("Signup")}
        />
      </View>
    );
  }
}
