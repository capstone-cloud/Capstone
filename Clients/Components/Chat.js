import React, { Component } from "react";
import { SafeAreaView, Text, TouchableOpacity, TextInput, FlatList, Dimensions, View } from "react-native";
import firebase, { firestore}   from "../../fire";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user'),
      text: "",
      messages: []
    };
    this.ref = firestore
      .collection("chat")
      .doc(this.props.navigation.getParam("groupId"));
  }
  componentDidMount() {
     this.ref.onSnapshot((doc) => {
       this.setState({messages: doc.data().chits})
    })
  }

  handleChange = val => {
    this.setState({text: val})
  }

   onSend = () => {
    if(this.state.text.length > 0) {
        let msg = {
        message: this.state.text,
        time: firebase.database.ServerValue.TIMESTAMP,
        user: this.state.user
        }

      this.ref.update({chits: firebase.firestore.FieldValue.arrayUnion(msg) })
      this.setState({text:''})
      
    }
  }

  renderRow = ({item}) => {
    return(
      <View style={{
        flexDirection: 'row',
        width:'60%',
        borderRadius:5,
        marginBotton:10,
        alignSelf: item.user===this.state.user? 'flex-start':'flex-end'}}>
      <Text>
        {item.user}: {item.message}
      </Text>
      </View>
    )
  }


  render() {
    let {height, width} = Dimensions.get('window')

    return (
      <SafeAreaView>
        <FlatList
        style={{padding:10, height: height*0.8}}
        data={this.state.messages}
        renderItem={this.renderRow}
        keyExtractor={(item, index)=> index.toString()}
        />
        <View style={{flextDirection: 'row', alignItems: 'center'}}>
        <TextInput
          value={this.state.text}
          placeholder="Type Message..."
          onChangeText={value => this.handleChange(value)}/>
        <TouchableOpacity
          onPress={this.onSend}>
          <Text>Send</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Chat;
