import React, { Component } from 'react';
import { firestore, auth } from '../../fire';
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

export default class SignUp extends Component {
  state = {
    username: '',
    name: '',
    password: '',
    email: ''
  };

  render() {
    const { username, name, password, email } = this.state;
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
            value={email}
            placeholder="email"
            style={styles.textInput}
            onChangeText={value => this.setState({ email: value })}
          />
          <TextInput
            value={password}
            placeholder="password"
            style={styles.textInput}
            onChangeText={value => this.setState({ password: value })}
          />

          <Button
            onPress={() => {
              if (email && password && username && name) {
                firestore
                  .collection('publicUsers')
                  .where('username', '==', username)
                  .get()
                  .then(snapshot => {
                    console.log(snapshot.docs.length);
                    if (snapshot.docs.length) {
                      alert('Username already exists');
                      this.setState({
                        username: ''
                      });
                    } else {
                      auth
                        .createUserWithEmailAndPassword(email, password)
                        .then(user => {
                          firestore
                            .collection('publicUsers')
                            .doc(auth.currentUser.uid)
                            .set({
                              username,
                              name
                            });
                          navigate('Groups', {
                            userId: auth.currentUser.uid
                          });
                        })
                        .catch(function(error) {
                          var errorMessage = error.message;
                          alert(errorMessage);
                        });
                    }
                  })
                  .catch(error => alert(error.message));
              }
            }}
            title="Add User"
            color="#841584"
          />
        </View>
      </SafeAreaView>
    );
  }
}
