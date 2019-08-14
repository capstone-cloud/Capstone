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
    members: [this.props.navigation.getParam("username")],
    memberToAdd: ""
  };

  render() {
    const { name, members } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container_signup_form}>
        <View style={styles.inputContainer}>
          <Text>Add Group</Text>
          <Text>Add Name</Text>
          <TextInput
            value={this.state.groupname}
            defaultValue={this.state.groupname}
            placeholder="Group Name"
            style={styles.textInput}
            onChangeText={value => this.setState({ groupname: value })}
          />
          <Text>Add Member</Text>
          <TextInput
            value={this.state.memberToAdd}
            defaultValue=""
            placeholder="members"
            style={styles.textInput}
            onChangeText={value => this.setState({ memberToAdd: value })}
          />
          <Button
            title="Add Another"
            color="purple"
            onPress={() => {
              this.setState({
                members: [...this.state.members, this.state.memberToAdd]
              });
              this.setState({ memberToAdd: "" });
            }}
          />

          <Text>Current Members:</Text>
          <Text>{this.state.members.join(", ")}</Text>

          <Button
            title="Add Group"
            color="purple"
            onPress={() => {
              firestore
                .collection("groups")
                .add({
                  groupname: this.state.groupname,
                  members: this.state.members
                })
                .then(doc =>
                  firestore
                    .collection("chat")
                    .doc(doc.id)
                    .set({ chits: [] })
                );
              alert("Group Added");
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
