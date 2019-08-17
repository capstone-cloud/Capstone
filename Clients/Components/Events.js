import React, { Component } from 'react';
import { Text, View, Button, Dimensions } from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { firestore } from '../../fire';
import EventItem from './EventItem';
import AddEventForm from './AddEventForm';

export default class Events extends Component {
  static navigationOptions = {
    title: 'Splitzies!'
  };
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      events: [],
      groupname: ''
    };
  }
  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  componentDidMount() {
    this.setState({ groupname: this.props.navigation.getParam('groupname') });
    firestore
      .collection('events')
      .where('groupId', '==', this.props.navigation.getParam('groupId'))

      .onSnapshot(snapshot => {
        this.setState({ events: [] });
        snapshot.forEach(doc => {
          this.setState({
            events: [...this.state.events, { id: doc.id, data: doc.data() }]
          });
        });
      });
  }

  render() {
    let { height, width } = Dimensions.get('window');
    const { navigate, getParam } = this.props.navigation;
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
              groupId={this.props.navigation.getParam('groupId')}
              user={getParam('user')}
              groupname={this.props.navigation.getParam('groupId')}
            />
          ))}
        </Card>
        <AddEventForm
          isModalVisible={this.state.isModalVisible}
          toggleModal={this.toggleModal}
          groupId={this.props.navigation.getParam('groupId')}
          height={height}
          navigate={navigate}
          getParam={getParam}
          width={width}
        />
        {/* <Button
          onPress={() => {
            navigate('AddEventForm', {
              groupId: this.props.navigation.getParam('groupId'),
            //   groupname: this.props.navigation.getParam('groupname')
            });
          }}
          title="Add an event"
          color="black"
        /> */}
        <Button
          onPress={() => {
            this.toggleModal();
          }}
          title="Add Event"
          color="black"
        />
      </View>
    );
  }
}
