import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Picker
} from "react-native";
import styles from "./Style";
import { firestore } from "../../fire";

export default class UpdateGroup extends Component {
  state = {
    groupname: this.props.navigation.getParam("groupname"),
    members: this.props.navigation.getParam("members"),
    memberToAdd: "",
    memberToRemove: "Click to Select"
  };
  render() {
    const { name, members } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container_signup_form}>
        <View style={styles.inputContainer}>
          <Text>Edit Group</Text>
          <Text>Change Name</Text>
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

          <Text>Remove Member:</Text>

          <Picker
            itemStyle={{
              color: "black",
              backgroundColor: "pink",
              fontSize: 24,
              height: "40%"
            }}
            selectedValue={this.state.memberToRemove}
            onValueChange={value => this.setState({ memberToRemove: value })}
          >
            {this.state.members.map(member => (
              <Picker.Item key={member} label={member} value={member} />
            ))}
          </Picker>
          <Text>{this.state.memberToRemove}</Text>

          <Button
            title="Remove"
            color="purple"
            onPress={() => {
              let newMem = this.state.members.filter(
                member => member !== this.state.memberToRemove
              );
              this.setState({
                members: newMem
              });
              this.setState({ memberToRemove: "" });
            }}
          />

          <Text>Current Members:</Text>
          <Text>{this.state.members.join(", ")}</Text>

          <Button
            title="Finalize Group"
            color="purple"
            onPress={() => {
              firestore
                .collection("groups")
                .doc(this.props.navigation.getParam("groupId"))
                .set({
                  groupname: this.state.groupname,
                  members: this.state.members
                });
              alert("Group Updated");
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
