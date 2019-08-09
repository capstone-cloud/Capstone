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

export default class App extends Component {
  state = {
    username: "",
    name: ""
  };

  render() {
    const { username, name } = this.state;

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
          <Button
            onPress={() => {
              alert("Add the user");
              firestore
                .collection("users")
                .doc("fuckmylifeonemoretime")
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
