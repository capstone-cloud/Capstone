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
  }
  componentDidMount() {
    firestore.collection('groups')
      .where("members", "array-contains", this.props.navigation.getParam("userId"))
      .get()
      .then(docs => docs.forEach(doc => {
        this.setState({groups: [...this.state.groups, {id:doc.id, data:doc.data()}]})
      }))
  }
  returnSubtitle(members) {
    let len = members.length
    if (len < 5) {return members.join(', ')}
    else{
      let FirstThree = members.filter((cur, i) => i < 3).join(', ')
      return FirstThree + `... and ${len-3} more`
    }
  }

  render() {
    const { navigate } = this.props.navigation;   
    return (
      <View>
        <Text style={styles.userPage}>Groups</Text>
        <Card title="GROUPS">
          {this.state.groups.map((group, i) => (
            <ListItem
              key={i}
              title={group.data.groupname}
              subtitle={this.returnSubtitle(group.data.members)}
              onPress={() => {
                navigate("Events", {
                  groupId: group.id,
                  groupname: group.data.groupname
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
