import React, { Component } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  TextInput,
  Button,
  LabelForm
} from 'react-native';
import styles from './Style';
import Modal from 'react-native-modal';
import { firestore } from '../../fire';

export default class AddEventForm extends Component {
  state = {
    eventname: ''
  };

  addEvent() {
    if (this.state.eventname.length > 0) {
      firestore
        .collection('events')
        .add({
          eventname: this.state.eventname,
          groupId: this.props.groupId
        })
        .catch(error => {
          console.error(error);
        });
      alert('Added Event!');
    } else {
      alert('Fill out field!');
    }
  }

  render() {
    const navigate = this.props.navigate;
    const getParam = this.props.getParam;

    return (
      <View style={{ flex: 3 }}>
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
              value={this.state.eventname}
              defaultValue={this.state.event}
              placeholder="Event Name"
              style={styles.inputModalForm}
              onChangeText={value => this.setState({ eventname: value })}
            />
            <TouchableOpacity
              onPress={() => {
                this.addEvent();
              }}
            >
              <Text style={styles.modalButton}>Add Event</Text>
            </TouchableOpacity>

            {
              <TouchableOpacity onPress={this.props.toggleModal}>
                <Text style={styles.back}>Back</Text>
              </TouchableOpacity>
            }
          </View>
        </Modal>
      </View>
    );
  }
}
