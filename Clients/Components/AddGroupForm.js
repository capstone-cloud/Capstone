import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button
} from "react-native";
import styles from "./Style";
import { firestore } from "../../fire";

export default class AddGroupForm extends Component {
  state = {
    groupname: "",
    members: ""
  };

  render() {
    const { name, members } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container_signup_form}>
        <View style={styles.inputContainer}>
          <Text>Add Group</Text>
          <TextInput
            value={name}
            placeholder="Group Name"
            style={styles.textInput}
            onChangeText={value => this.setState({ groupname: value })}
          />
          <TextInput
            value={members}
            placeholder="members"
            style={styles.textInput}
            onChangeText={value => this.setState({ members: value })}
          />

          <Button
            onPress={() => {
              alert("Group successfully added!");
              firestore
                .collection("groups")

                .add(this.state)
                .then(docSnapshot => {
                  firestore
                    .collection("publicUsers")
                    .doc(this.props.navigation.getParam("userId"))
                    .update({
                      myGroups: firebase.firestore.FieldValue.arrayUnion(
                        docSnapshot.id
                      )
                    });
                });
              navigate("Groups");
            }}
            title="Add Group"
            color="black"
          />
        </View>
      </SafeAreaView>
    );
  }
}
