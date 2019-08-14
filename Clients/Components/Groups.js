import React, { Component } from 'react';
import UserPage from './UserPage';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import styles from './Style';
import { firestore, auth } from '../../fire';
import GroupItem from './GroupItem';

export default class Groups extends Component {
  static navigationOptions = {
    title: 'Splitzies!',
    headerLeft: null
  };
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }

  async getUserName() {
    try {
      const user = await firestore
        .collection('publicUsers')
        .doc(this.props.navigation.getParam('userId', 'NO-ID'))
        .get();

      return user.data().username;
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    const username = await this.getUserName();

    firestore
      .collection('groups')
      .where('members', 'array-contains', username)
      .get()
      .then(docs =>
        docs.forEach(doc => {
          this.setState({
            groups: [...this.state.groups, { id: doc.id, data: doc.data() }]
          });
        })
      );
  }
  returnSubtitle(members) {
    let len = members.length;
    if (len < 5) {
      return members.join(', ');
    } else {
      let FirstThree = members.filter((cur, i) => i < 3).join(', ');
      return FirstThree + `... and ${len - 3} more`;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text style={styles.userPage}>Groups</Text>
        <Card title="GROUPS">
          {this.state.groups.map((group, i) => (
            <GroupItem
              key={i}
              id={group.id}
              group={group.data}
              returnSubtitle={this.returnSubtitle}
              navigate={navigate}
            />
          ))}
        </Card>
        <Button
          onPress={() => {
            navigate('AddGroupForm', {
              userId: this.props.navigation.getParam('userId')
            });
          }}
          title="Add a group"
          color="black"
        />
        <Button
          onPress={() => {
            auth
              .signOut()
              .then(function() {
                alert('Signed out!');
                navigate('Loading');
              })
              .catch(function(error) {
                alert(error.message);
              });
          }}
          title="Sign Out"
        />
      </View>
    );
  }
}
