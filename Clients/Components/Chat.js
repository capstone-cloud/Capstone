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
        alignSelf: item.user===this.state.user? 'flex-start':'flex-end',
        backgroundColor: item.user===this.state.user? '#1e90ff':'#A9A9A9'}}>
      <Text style={{
        fontSize: 20,
        color: "white"
      }}>
        {item.user}: {item.message}
      </Text>
      </View>
    )
  }


  render() {
    let {height, width} = Dimensions.get('window')

    return (
      <SafeAreaView
        style={{flexDirection:"column"}}>
        <FlatList
        style={{paddingBottom:15, height:height*0.8, flexDirection:"column"}}
        data={this.state.messages}
        renderItem={this.renderRow}
        keyExtractor={(item, index)=> index.toString()}
        />
        <View style={{flextDirection: 'row', alignSelf: 'flex-end', height:height*0.2}}>
        <TextInput
          style={{flexDirection:"row", width:width*0.8, borderRadius:0.5, borderColor:'black', alignSelf:'flex-start'}}
          value={this.state.text}
          placeholder="Type Message..."
          onChangeText={value => this.handleChange(value)}/>
        <TouchableOpacity
          onPress={this.onSend}
          style={{ alignSelf:'center', width:width*0.2, alignSelf:'flex-end' }}>
          <Text>Send</Text>
        </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default Chat;
