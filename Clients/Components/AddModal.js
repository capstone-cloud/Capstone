import React, { Component } from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import styles from './Style';
import { firestore } from '../../fire';

export default class AddModal extends Component {
  state = {
    itemName: '',
    itemPrice: '',
    itemQty: '',
    sharedBy: {}
  };

  render() {
    return (
      <View style={{ flex: 3 }}>
        <Button title="Add Item" onPress={this.toggleModal} />
        <Modal isVisible={this.props.isModalVisible} transparent={false}>
          <View style={styles.contained}>
            <Text>Add Item</Text>
            <TextInput
              value={this.state.itemName}
              defaultValue=""
              placeholder="item name"
              style={styles.textInput}
              onChangeText={value => this.setState({ itemName: value })}
            />
            <TextInput
              value={this.state.itemPrice}
              defaultValue=""
              placeholder="item price(x1)"
              style={styles.textInput}
              onChangeText={value => this.setState({ itemPrice: value })}
            />
            <TextInput
              value={this.state.itemQty}
              defaultValue=""
              placeholder="item quantity"
              style={styles.textInput}
              onChangeText={value => this.setState({ itemQty: value })}
            />

            <Button
              title="Add Items"
              color="purple"
              onPress={() => {
                firestore
                  .collection('events')
                  .doc(this.props.eventId)
                  .collection('items')
                  .add(this.state)
                  .catch(error => {
                    console.error(error);
                  });
                alert('Item Added');
              }}
            />
            <Button title="Submit" onPress={this.props.toggleModal} />
          </View>
        </Modal>
      </View>
    );
  }
}
