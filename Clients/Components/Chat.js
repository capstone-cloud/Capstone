import React, { Component } from "react";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import { firestore } from "../../fire";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: [],
      chatToAdd: ""
    };
    this.ref = firestore
      .collection("chat")
      .doc(this.props.navigation.getParam("groupId"));
  }
  componentDidMount() {
    this.ref.get().then(chat => this.setState({ chat: chat.data().chits }));
  }

  render() {
    console.log(this.state.chat);
    return (
      <View>
        <ScrollView height="90%">
          {this.state.chat.map((text, i) => {
            return (
              <View key={i}>
                <Text>
                  {text.user}: {text.message}
                </Text>
              </View>
            );
          })}
        </ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignSelf: "flex-end"
          }}
          height="10%"
        >
          <TextInput
            value={this.state.chatToAdd}
            placeholder="Message"
            onChangeText={value => this.setState({ chatToAdd: value })}
            width="70%"
          />
          <Button
            title="Send"
            color="purple"
            width="20%"
            onPress={async () => {
              await this.setState({
                chat: [
                  ...this.state.chat,
                  {
                    user: this.props.navigation.getParam("user"),
                    message: this.state.chatToAdd
                  }
                ],
                chatToAdd: ""
              });
              console.log(this.state.chat);
              this.ref.set({ chits: this.state.chat });
            }}
          />
        </View>
      </View>
    );
  }
}

export default Chat;
