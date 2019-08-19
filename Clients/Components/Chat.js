import React, { Component } from "react";
import { firestore, auth } from "../../fire";
import { GiftedChat, Bubble } from "react-native-gifted-chat";

class Chat extends Component {
  static navigationOptions = {
    title: "CHAT"
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
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(doc => {
      const messages = [];
      doc.data().chits.forEach(chit => {
        let date = new Date(chit.createdAt.seconds * 1000);
        messages.push({
          _id: chit._id,
          createdAt: date,
          text: chit.text,
          user: chit.user
        });
      });
      // this.setState(previousState => {
      //   return {
      //     messages: GiftedChat.append([], messages)
      //   };
      // });
      this.setState({ messages });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#99D6FB"
          },
          right: {
            backgroundColor: "pink"
          }
        }}
        textStyle={{
          left: {
            color: "white"
          },
          right: {
            color: "white"
          }
        }}
      />
    );
  }

  onSend = messages => {
    const { _id, createdAt, text, user } = messages[0];
    const message = {
      _id,
      createdAt: new Date(),
      text,
      user
    };
    this.ref.update({ chits: [...this.state.messages, message] });
  };
  render() {
    return (
      <GiftedChat
        messages={[...this.state.messages].reverse()}
        onSend={messages => this.onSend(messages)}
        user={{ _id: auth.currentUser.uid, name: this.state.user, avatar: "" }}
        renderTime={() => {
          return null;
        }}
        renderBubble={this.renderBubble}
      />
    );
  }
}

export default Chat;
