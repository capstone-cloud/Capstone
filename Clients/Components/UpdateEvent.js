import React, { Component } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Picker
} from 'react-native';
import styles from './Style';
import { firestore } from '../../fire';

export default class UpdateEvent extends Component {
  state = {
    eventname: this.props.navigation.getParam('eventname'),
    items: this.props.navigation.getParam('items'),
    itemtoAdd_name: '',
    itemtoAdd_price: '',
    itemtoAdd_qty: '',
    itemToRemove: 0
  };
  render() {
    const { name, members } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container_signup_form}>
        <View style={styles.inputContainer}>
          <Text>Edit Event</Text>
          <Text>Change Name</Text>
          <TextInput
            value={this.state.eventname}
            defaultValue={this.state.eventname}
            placeholder="item Name"
            style={styles.textInput}
            onChangeText={value => this.setState({ eventname: value })}
          />
          <Text>Add Item</Text>
          <TextInput
            value={this.state.itemtoAdd_name}
            defaultValue=""
            placeholder="item name"
            style={styles.textInput}
            onChangeText={value => this.setState({ itemtoAdd_name: value })}
          />
          <TextInput
            value={this.state.itemtoAdd_price}
            defaultValue=""
            placeholder="item price(x1)"
            style={styles.textInput}
            onChangeText={value => this.setState({ itemtoAdd_price: value })}
          />
          <TextInput
            value={this.state.itemtoAdd_qty}
            defaultValue=""
            placeholder="item quantity"
            style={styles.textInput}
            onChangeText={value => this.setState({ itemtoAdd_qty: value })}
          />
          <Button
            title="Add Another"
            color="purple"
            onPress={() => {
              this.setState({
                items: [
                  ...this.state.items,
                  {
                    name: this.state.itemtoAdd_name,
                    price: this.state.itemtoAdd_price,
                    qty: this.state.itemtoAdd_qty
                  }
                ]
              });
              this.setState({
                itemtoAdd_name: '',
                itemtoAdd_price: '',
                itemtoAdd_qty: ''
              });
            }}
          />

          <Text>Remove Items:</Text>

          <Picker
            itemStyle={{
              color: 'black',
              backgroundColor: 'pink',
              fontSize: 26,
              height: '40%'
            }}
            selectedValue={this.state.itemToRemove}
            onValueChange={value => this.setState({ itemToRemove: value })}
          >
            {this.state.items.map((item, i) => {
              let label = item.name + ' x' + item.qty;
              return <Picker.Item key={i} label={label} value={i} />;
            })}
          </Picker>
          <Text>
            {this.state.items.length
              ? this.state.items[this.state.itemToRemove].name
              : 'No Items!'}
          </Text>

          <Button
            title="Remove"
            color="purple"
            onPress={() => {
              let newItems = this.state.items.filter(
                (item, i) => i !== this.state.itemToRemove
              );
              console.log(newItems);
              this.setState({
                items: newItems,
                itemToRemove: 0
              });
            }}
          />

          <Text>Current Items:</Text>
          <Text>{this.state.items.map(item => item.name).join(', ')}</Text>

          <Button
            title="Finalize Event"
            color="blue"
            onPress={() => {
              console.log(this.props.navigation.getParam('id'));
              firestore
                .collection('events')
                .doc(this.props.navigation.getParam('id'))
                .set({
                  eventname: this.state.eventname,
                  groupId: this.props.navigation.getParam('groupId'),
                  items: this.state.items
                });
              alert('Event Updated');
              navigate('Events', {
                groupId: this.props.groupId,
                groupname: this.props.groupname
              });
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
