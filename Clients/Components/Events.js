import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { ListItem, Card } from "react-native-elements";
import { firestore } from "../../fire";

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      groupname:''
    };
  }

  componentDidMount() {
    this.setState({groupname: this.props.navigation.getParam("groupname")})
    firestore.collection('events')
      .where('groupId', '==', this.props.navigation.getParam("groupId"))  
      .get()
      .then(docs => docs.forEach(doc => {
        this.setState({events: [...this.state.events, {id: doc.id, data:doc.data()}]})
      }))
  }

  render() {
    const { navigate } = this.props.navigation;   
    return(
      <View>
        <Text>{this.state.groupname}</Text>
        <Card title="EVENTS">
          {this.state.events.map((event, i) => (
            <ListItem
              key={i}
              title={event.data.eventname}
              onPress={() => {
                navigate("Items", {
                  eventId: event.id
                })
              }}
            />
          ))}
          </Card>
        <Button
          onPress={() => {
            navigate("AddEventForm", {
              groupId: this.props.navigation.getParam("groupId")
            })
          }}
          title="Add an event"
          color="black"
          />
      </View>
    )
}
}
