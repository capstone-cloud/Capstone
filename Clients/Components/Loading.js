import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

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
          title="Sign Up"
          onPress={() => navigate("Signup")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: "yellow",
    fontWeight: "bold",
    fontSize: 40,
    paddingBottom: 30
  }
});
