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
import { firestore } from '../../fire';

export default class Groups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
    this.ref = firestore
      .collection('publicUsers')
      .doc('rameen98')
      .collection('groups');
  }
  componentDidMount() {
    this.ref
      .get()
      .then(snapshot => {
        const groups = [];
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          groups.push(doc.data());
        });
        this.setState({ groups: groups });
      })
      .catch(err => {
        console.log('Error', err);
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
              title={group.groupname}
              subtitle={group.members}
            />
          ))}
        </Card>
        <Button
          onPress={() => {
            navigate('AddGroupForm');
          }}
          title="Add a group"
          color="black"
        />
      </View>
    );
  }
}
