// import React, { Component } from "react";
// import { SafeAreaView, Text, View, TextInput, Button } from "react-native";
// import styles from "./Style";
// import { firestore } from "../../fire";

// export default class UserPage extends Component {
//   static navigationOptions = {
//     title: "Welcome"
//   };

//   render() {
//     const { navigate } = this.props.navigation;
//     return (
//       <View style={styles.container}>
//         <Text style={styles.userPage}>Welcome</Text>
//         <Button
//           onPress={() => {
//             navigate("Groups", {
//               userId: this.props.navigation.getParam("userId")
//             });
//           }}
//           title="Groups"
//           color="white"
//         />
//         <Button
//           onPress={() => {
//             navigate("Events");
//           }}
//           title="Events"
//           color="white"
//         />
//       </View>
//     );
//   }
// }
