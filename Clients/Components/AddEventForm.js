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

  // onPressButton = () => {
  //   this.setState({ TextInputDisableStatus: false });
  // };
  render() {
    const navigate = this.props.navigate;
    const getParam = this.props.getParam;

    return (
      <View style={{ flex: 3 }}>
        <Button title="Add Event" onPress={this.toggleModal} />
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
              // editable={this.state.TextInputDisableHolder}
              onChangeText={value => this.setState({ eventname: value })}
            />
            <TouchableOpacity
              onPress={() => {
                firestore
                  .collection('events')
                  .add({
                    eventname: this.state.eventname,
                    // groupId: getParam('groupId')
                    groupId: this.props.groupId
                  })
                  .catch(error => {
                    console.error(error);
                  });
                alert('Added Event!');
              }}
            >
              <Text style={styles.button}>Add Event</Text>
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
