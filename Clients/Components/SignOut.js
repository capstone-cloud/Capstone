import React, { Component } from 'react';
import { Button } from 'react-native';
import { auth } from '../../fire';

export default class SignOut extends Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <div>
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
      
      </div>
    );
  }
}
