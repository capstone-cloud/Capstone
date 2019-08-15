import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';
import styles from './Style';
import { firestore } from '../../fire';


export default class AddGroupForm extends Component {
  state = {
    eventname: ''
    // items: [],
    // itemName: "",
    // itemPrice:'',
    // itemQty:''
  };

  render() {
    const { name, members } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={styles.container_signup_form}>
        <View style={styles.inputContainer}>
          <Text>Add Event</Text>
          <Text>Add Name</Text>
          <TextInput
            value={this.state.eventname}
            defaultValue={this.state.event}
            placeholder="Event Name"
            style={styles.textInput}
            onChangeText={value => this.setState({ eventname: value })}
          />
          {/* <Text>Add Item</Text>
          <TextInput
            value={this.state.itemName}
            defaultValue=""
            placeholder="item name"
            style={styles.textInput}
            onChangeText={value => this.setState({itemName: value})}
          />
          <TextInput
            value={this.state.itemPrice}
            defaultValue=""
            placeholder="item price(x1)"
            style={styles.textInput}
            onChangeText={value => this.setState({itemPrice: value})}
          />
          <TextInput
            value={this.state.itemQty}
            defaultValue=''
            placeholder="item quantity"
            style={styles.textInput}
            onChangeText={value => this.setState({itemQty: value})}
          />
          <Button
            title='Add Another'
            color="purple"
            onPress={() => {
              this.setState({items: [...this.state.items, {
                  name: this.state.itemName,
                  price: this.state.itemPrice,
                  qty: this.state.itemQty
              }]});
              this.setState({
                itemName: '',
                itemPrice: '',
                itemQty: ''
              })
            }}
            />
          
          <Text>Current Items:</Text>
          <Text>{this.state.items.map(item => item.name).join(', ')}</Text> */}

          <Button
            title="Add Event"
            color="purple"
            onPress={() => {
              firestore.collection('events').add({
                eventname: this.state.eventname,
                // items: this.state.items,
                groupId: this.props.navigation.getParam('groupId')
              }).catch(error => {
                console.error(error)
              });
              alert('Event Added');
              navigate('Events');
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}
