import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import styles from './Style';
import { firestore } from '../../fire';
import SignOut from './SignOut';

export default class AddGroupForm extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Group',
      headerRight: <SignOut navigate={navigation.navigate} />
    };
  };
  state = {
    groupname: '',
    members: [this.props.navigation.getParam('username')],
    memberToAdd: ''
  };

  render() {
    const { name, members } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container_signup_form}>
        <View style={styles.inputContainer}>
          <Text style={styles.edit}>Add Group</Text>
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
            title="Add Member"
            color="purple"
            onPress={() => {
              this.setState({
                members: [...this.state.members, this.state.memberToAdd]
              });
              this.setState({ memberToAdd: '' });
            }}
          />

          <Text>Current Members:</Text>
          <Text>{this.state.members.join(', ')}</Text>

          <Button
            title="Add Group"
            color="purple"
            onPress={() => {
              firestore
                .collection('groups')
                .add({
                  groupname: this.state.groupname,
                  members: this.state.members
                })
                .then(doc =>
                  firestore
                    .collection('chat')
                    .doc(doc.id)
                    .set({ chits: [] })
                );
              navigate('Groups', {
                username: this.props.navigation.getParam('username')
              });
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
