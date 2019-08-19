import React, { Component } from 'react';
import { Button } from 'react-native';
import { auth } from '../../fire';
import Groups from './Groups';
export default class SignOut extends Component {
  render() {
    const navigate = this.props.navigate;
    // const navigation = this.props.navigation;
    // const getParam = this.props.getParam;
    return (
      <Button
        onPress={() => {
          auth
            .signOut()
            .then(function() {
              alert('Signed out!');
              this.props.navigation.navigate('Loading');
            })
            .catch(function(error) {
              alert(error.message);
            });
        }}
        title="Sign Out"
      />
    );
  }
}
