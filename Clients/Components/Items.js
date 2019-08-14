import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { firestore } from '../../fire';

export default class Items extends Component {
  static navigationOptions = {
    title: 'Splitzies!'
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      items: []
    };
  }

  componentDidMount() {
    firestore
      .collection('events')
      .doc(this.props.navigation.getParam('eventId'))
      .get()
      .then(doc => {
        this.setState({ name: doc.data().eventName, items: doc.data().items });
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>{this.state.name}</Text>
        <Card title="Items">
          {this.state.items.map((item, i) => (
            <ListItem
              key={i}
              title={`${item.name} x${item.qty}`}
              subtitle={item.price}
              onPress={() => {
                console.log('hello');
              }}
            />
          ))}
        </Card>
      </View>
    );
  }
}
