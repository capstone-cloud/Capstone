import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { firestore, auth } from '../../fire';
import Modal from 'react-native-modal';
import AddModal from './AddModal';

export default class Items extends Component {
  static navigationOptions = {
    title: 'Splitzies!'
  };

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,

      items: []
    };
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  componentDidMount() {
    firestore
      .collection('events')
      .doc(this.props.navigation.getParam('eventId'))
      .collection('items')
      .onSnapshot(docs => {
        const items = [];
        docs.forEach(doc => {
          items.push({ id: doc.id, data: doc.data() });
        });
        this.setState({ items });
      });
  }

  render() {
    const { navigate, getParam } = this.props.navigation;
    return (
      <View>
        <Text>{this.state.name}</Text>
        <Card title="Items">
          {this.state.items &&
            this.state.items.map((item, i) => (
              <ListItem
                key={i}
                title={`${item.data.itemName} x${item.data.itemQty} : $${item
                  .data.itemPrice * item.data.itemQty}`}
                subtitle={
                  item &&
                  `${Object.keys(item.data.sharedBy)
                    .filter(member => item.data.sharedBy[member] === true)
                    .join(', ')}`
                }
                onPress={() => {
                  let newMembers = item.data.sharedBy;
                  const user = getParam('user');
                  if (newMembers[user]) {
                    newMembers[user] = false;
                  } else {
                    newMembers[user] = true;
                  }

                  firestore
                    .collection('events')
                    .doc(this.props.navigation.getParam('eventId'))
                    .collection('items')
                    .doc(item.id)
                    .update({ sharedBy: newMembers });
                }}
              />
            ))}
        </Card>
        <AddModal
          isModalVisible={this.state.isModalVisible}
          toggleModal={this.toggleModal}
          eventId={this.props.navigation.getParam('eventId')}
        />
        <Button
          onPress={() => {
            // navigate('AddModal');
            this.toggleModal();
          }}
          title="Add item"
          color="black"
        />
      </View>
    );
  }
}
