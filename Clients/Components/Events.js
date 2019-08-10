import React, { Component } from "react";
import { Text, View, Button } from "react-native";
import { ListItem } from "react-native-elements";
import { firestore } from "../../fire";

export default class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    this.ref = firestore
      .collection("publicUsers")
      .doc("rameen98")
      .collection("groups")
      .doc("NRMe24IJliDlQZmS0ScJ")
      .collection("events");
  }

  static navigationOptions = {
    title: "Every Friday"
  };

  componentDidMount() {
    this.ref
      .get()
      .then(snapshot => {
        const events = [];
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data());
          events.push(doc.data());
        });
        this.setState({ events: events });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  render() {
    console.log("is this happending");
    const { navigate } = this.props.navigation;
    return (
      <View>
        {this.state.events.map((event, i) => (
          <ListItem
            key={i}
            leftAvatar={{
              source: {
                uri:
                  "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"
              }
            }}
            title={event.name}
            subtitle={`$${event.total}`}
          />
        ))}
      </View>
    );
  }
}
