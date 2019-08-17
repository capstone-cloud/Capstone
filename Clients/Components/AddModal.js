import React, { Component } from 'react';
import { Button, Text, View, TextInput, TouchableOpacity } from 'react-native';
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

  addItem() {
    if (
      this.state.itemName.length &&
      this.state.itemPrice.length &&
      this.state.itemQty.length
    ) {
      firestore
        .collection('events')
        .doc(this.props.eventId)
        .collection('items')
        .add(this.state)
        .catch(error => {
          console.error(error);
        });
      this.setState({
        itemName: '',
        itemPrice: '',
        itemQty: '',
        sharedBy: {}
      });
      alert('Added Item!');
    } else {
      alert('Please fill out all fields!');
    }
  }
  render() {
    return (
      <View style={{ flex: 3 }}>
        <Button title="Add Item" onPress={this.toggleModal} />
        <Modal
          isVisible={this.props.isModalVisible}
          animationType={'none'}
          transparent={false}
        >
          <View
            style={styles.modal}
            width={this.props.width * 0.8}
            height={this.props.height * 0.5}
          >
            <TextInput
              value={this.state.itemName}
              defaultValue=""
              placeholder="Item Name"
              style={styles.inputModalForm}
              onChangeText={value => this.setState({ itemName: value })}
            />
            <TextInput
              value={this.state.itemPrice}
              defaultValue=""
              placeholder="Item Price(x1)"
              style={styles.inputModalForm}
              onChangeText={value => this.setState({ itemPrice: value })}
            />
            <TextInput
              value={this.state.itemQty}
              defaultValue=""
              placeholder="Item Quantity"
              style={styles.inputModalForm}
              onChangeText={value => this.setState({ itemQty: value })}
            />
            <TouchableOpacity
              onPress={() => {
                this.addItem();
              }}
            >
              <Text style={styles.button}>Add Item</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.props.toggleModal}>
              <Text style={styles.back}>Back</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    );
  }
}
