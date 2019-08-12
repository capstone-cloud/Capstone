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

export default class SignUp extends Component {
  state = {
    username: '',
    name: '',
    password: '',
    phone: ''
  };

  render() {
    const { username, name, password, phone } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container_signup_form}>
        <View style={styles.inputContainer}>
          <Text>Sign Up</Text>
          <TextInput
            value={username}
            placeholder="username"
            style={styles.textInput}
            onChangeText={value => this.setState({ username: value })}
          />
          <TextInput
            value={name}
            placeholder="name"
            style={styles.textInput}
            onChangeText={value => this.setState({ name: value })}
          />
          <TextInput
            value={phone}
            placeholder="phone"
            style={styles.textInput}
            onChangeText={value => this.setState({ phone: value })}
          />
          <TextInput
            value={password}
            placeholder="password"
            style={styles.textInput}
            onChangeText={value => this.setState({ password: value })}
          />
          <Button
            onPress={() => {
              alert('User successfully added!');
              firestore
                .collection('users')
                .doc(this.state.username)
                .set(this.state);
              firestore
                .collection('publicUsers')
                .doc(this.state.username)
                .set({
                  username: this.state.username,
                  name: this.state.name,
                  groupId: []
                });
              navigate('UserPage');
            }}
            title="Add User"
            color="#841584"
          />
        </View>
      </SafeAreaView>
    );
  }
}
