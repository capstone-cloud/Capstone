import React, { Component } from 'react';
import { SafeAreaView, Text, View, TextInput, Button } from 'react-native';
import styles from './Style';
import { firestore, auth } from '../../fire';

export default class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  static navigationOptions = {
    title: 'Welcome'
  };

  render() {
    const { email, password } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <SafeAreaView style={styles.container_signup_form}>
        <View style={styles.inputContainer}>
          <Text>Log In</Text>
          <TextInput
            value={email}
            placeholder="email"
            style={styles.textInput}
            onChangeText={value => this.setState({ email: value })}
          />
          <TextInput
            secureTextEntry={true}
            value={password}
            placeholder="password"
            style={styles.textInput}
            onChangeText={value => this.setState({ password: value })}
          />

          <Button
            onPress={() => {
              auth
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                  navigate('Groups', {
                    userId: auth.currentUser.uid
                  });
                })
                .catch(function(error) {
                  var errorMessage = error.message;
                  alert(errorMessage);
                });
            }}
            title="Sign In"
            color="#841584"
          />
        </View>
      </SafeAreaView>
    );
  }
}
