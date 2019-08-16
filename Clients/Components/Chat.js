import React, { Component } from "react";
import {
 SafeAreaView,
 Text,
 TouchableOpacity,
 TextInput,
 FlatList,
 Dimensions,
 View
} from "react-native";
import firebase, { firestore, auth } from "../../fire";
import { GiftedChat } from "react-native-gifted-chat";
class Chat extends Component {
 static navigationOptions = {
   title: 
   "CHAT"
 };
 constructor(props) {
   super(props);
   this.state = {
     user: this.props.navigation.getParam("user"),
     messages: []
   };
   this.ref = firestore
     .collection("chat")
     .doc(this.props.navigation.getParam("groupId"));
   this.groupname = this.props.navigation.getParam("groupname");
 }
 componentDidMount() {
   this.ref.onSnapshot(doc => {
     this.setState({
       messages: doc.data().chits
     });
   });
 }
 onSend = messages => {
   const { _id, createdAt, text, user } = messages[0];
   const message = { _id, timestamp: null, text, user };
   this.ref.update({ chits: [...this.state.messages, message] });
 };
 render() {
   return (
     <GiftedChat
       messages={this.state.messages}
       onSend={messages => this.onSend(messages)}
       user={{ _id: auth.currentUser.uid, name: this.state.user, avatar: "" }}
       inverted={false}
     />
   );
 }
}
export default Chat;