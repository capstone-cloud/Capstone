import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button
} from "react-native";
import { firestore } from "../../fire";

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Splitzies!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'pink',
//     borderRadius: 4,
//     borderWidth: 0.5,
//     borderColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   title: {
//     color: 'yellow',
//     fontWeight: 'bold',
//     fontSize: 40,
//     paddingBottom: 30
//   }
// });

export default class SignUp extends Component {
  state = {
    username: "",
    name: "",
    password: "",
    phone: ""
  };

  render() {
    const { username, name, password, phone } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inputContainer}>
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
              alert("Add the user");
              firestore
                .collection("users")
                .doc(this.state.username)
                .set(this.state);
            }}
            title="Add the user"
            color="#841584"
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  inputContainer: {
    margin: 30
  },
  textInput: {
    height: 30,
    textAlign: "center",
    color: "#333333",
    marginBottom: 10,
    fontSize: 24,
    borderWidth: 1,
    borderBottomColor: "#111111"
  }
});
