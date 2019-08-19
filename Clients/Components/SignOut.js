import React from 'react';
import styles from './Style';
import { TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { auth } from '../../fire';

function SignOut(props) {
  return (
    <Icon
      name="exit-to-app"
      color="white"
      onPress={() => {
        auth
          .signOut()
          .then(function() {
            props.navigate('Loading');
            alert('Signed out!');
          })
          .catch(function(error) {
            alert(error.message);
          });
      }}
    />
    //   style={styles.signOut}
    //   onPress={() => {
    //     auth
    //       .signOut()
    //       .then(function() {
    //         props.navigate('Loading');
    //         alert('Signed out!');
    //       })
    //       .catch(function(error) {
    //         alert(error.message);
    //       });
    //   }}
    // >
    //   <Text>Sign Out</Text>
    // </TouchableOpacity>
  );
}

export default SignOut;
