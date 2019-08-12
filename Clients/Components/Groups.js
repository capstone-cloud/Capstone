import React, { Component } from "react";
import UserPage from "./UserPage";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button
} from "react-native";
import { ListItem, Card } from "react-native-elements";
import styles from "./Style";
import { firestore } from "../../fire";

export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
    this.ref = firestore
      .collection("publicUsers")
      .doc(this.props.navigation.getParam("userId"));
  }
  componentDidMount() {
    this.ref
      .get()
      .then(doc => {
        const groups = [];
        doc.data().myGroups.forEach(group => {
          groups.push(group.id);
        });
        console.log(groups);
        groups.forEach(group => {
          firestore
            .collection("groups")
            .doc(group)
            .get()
            .then(retrieved => {
              this.setState({
                groups: [
                  ...this.state.groups,
                  { id: group.id, data: retrieved.data() }
                ]
              });
            });
        });
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    console.log(this.state);
    return (
      <View>
        <Text style={styles.userPage}>Groups</Text>
        <Card title="GROUPS">
          {this.state.groups.map((group, i) => (
            <ListItem
              key={i}
              title={group.data.groupname}
              subtitle={group.data.members}
              onPress={() => {
                navigate("Events", {
                  groupId: group.id
                });
              }}
            />
          ))}
        </Card>
        <Button
          onPress={() => {
            navigate("AddGroupForm", {
              userId: this.props.navigation.getParam("userId")
            });
          }}
          title="Add a group"
          color="black"
        />
      </View>
    );
  }
}
