import React, { Component } from "react";
import { SafeAreaView, Text, View, TextInput, Button } from "react-native";
import styles from "./Style";
import { firestore } from "../../fire";
import AddGroupForm from "./AddGroupForm";

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  static navigationOptions = {
    title: "Welcome"
  };

  render() {
    const { username, password } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container_signup_form}>
        <View style={styles.inputContainer}>
          <Text>Log In</Text>
          <TextInput
            value={username}
            placeholder="username"
            style={styles.textInput}
            onChangeText={value => this.setState({ username: value })}
          />
          <TextInput
            value={password}
            placeholder="password"
            style={styles.textInput}
            onChangeText={value => this.setState({ password: value })}
          />

          <Button
            onPress={() => {
              const userRef = firestore
                .collection("users")
                .doc(`${this.state.username}`);

              userRef
                .get()
                .then(docSnapshot => {
                  if (docSnapshot.exists) {
                    userRef.onSnapshot(doc => {
                      if (this.state.password !== doc.data().password) {
                        alert("Wrong log-in info!");
                      } else {
                        alert("Signed In!");
                        navigate("Groups", {
                          userId: doc.id
                        });
                      }
                    });
                  } else {
                    alert("User does not exist");
                  }
                })
                .catch(error => {
                  console.error(error);
                });

              //   firestore
              //     .collection("users")
              //     .doc(this.state.username)
              //     .set(this.state);
              //   firestore
              //     .collection("publicUsers")
              //     .doc(this.state.username)
              //     .set({
              //       username: this.state.username,
              //       name: this.state.name
              //     });
            }}
            title="Sign In"
            color="#841584"
          />
        </View>
      </SafeAreaView>
    );
  }
}
