import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { ListItem, Card } from "react-native-elements";
import { firestore } from "../../fire";
import EventItem from "./EventItem";



export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      groupname: ""
    };
  }

  componentDidMount() {
    this.setState({ groupname: this.props.navigation.getParam("groupname") });
    firestore
      .collection("events")
      .where("groupId", "==", this.props.navigation.getParam("groupId"))
      .get()
      .then(docs =>
        docs.forEach(doc => {
          console.log(doc.data())
          this.setState({
            events: [...this.state.events, { id: doc.id, data: doc.data() }]
          });
        })
      );
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>{this.state.groupname}</Text>
        <Card title="EVENTS">
          {this.state.events.map((event, i) => (
            <EventItem
              key={i}
              id={event.id}
              event={event.data}
              navigate={navigate}
              groupId={this.props.navigation.getParam("groupId")}
            />
          ))}
        </Card>
        <Button
          onPress={() => {
            navigate("AddEventForm", {
              groupId: this.props.navigation.getParam("groupId")
            });
         
          }}
          title="Add an event"
          color="black"
        />
      </View>
    );
  }
}
