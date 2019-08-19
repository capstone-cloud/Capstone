import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { ListItem, Card } from 'react-native-elements';
import { firestore } from '../../fire';
import EventItem from './EventItem';
import styles from './Style';
import AddEventForm from './AddEventForm';
import SignOut from './SignOut';

export default class Events extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Events',

      headerRight: <SignOut navigate={navigation.navigate} />
    };
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
    this.unsubscribe = firestore
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

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    let { height, width } = Dimensions.get('window');
    const { navigate, getParam } = this.props.navigation;
    return (
      <ScrollView>
        <View>
          <Text style={styles.name}>{this.state.groupname}</Text>
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

          <TouchableOpacity
            style={{ paddingBottom: 50 }}
            onPress={() => {
              this.toggleModal();
            }}
          >
            <Text style={styles.button}>Add Event</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
