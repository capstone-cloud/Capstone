import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";
import SignUp from "./SignUp";
import Loading from "./Loading";

const MainNavigator = createStackNavigator({
  Loading: { screen: Loading },
  Signup: { screen: SignUp }
});

const App = createAppContainer(MainNavigator);

export default App;

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
//     backgroundColor: "pink",
//     borderRadius: 4,
//     borderWidth: 0.5,
//     borderColor: "white",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   title: {
//     color: "yellow",
//     fontWeight: "bold",
//     fontSize: 40,
//     paddingBottom: 30
//   }
// });
