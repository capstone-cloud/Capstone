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
import styles from './Style';
import { firestore } from '../../fire';

export default class Groups extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.userPage}>Groups</Text>
        <Button
          onPress={() => {
            navigate('AddGroupForm');
          }}
          title="Add a group"
          color="white"
        />
      </View>
    );
  }
}
