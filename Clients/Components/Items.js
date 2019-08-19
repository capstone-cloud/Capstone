import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { ListItem, Card, Icon } from 'react-native-elements';
import { firestore, auth } from '../../fire';
import AddModal from './AddModal';
import styles from './Style';

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

  handleRm(item, index) {
    let newItem = this.state.items.filter((item, i) => i !== index);
    firestore
      .collection('events')
      .doc(this.props.navigation.getParam('eventId'))
      .collection('items')
      .doc(item.id)
      .delete()
      .then(alert('Item Deleted!'));
  }

  render() {
    let { height, width } = Dimensions.get('window');
    const { navigate, getParam } = this.props.navigation;
    const user = getParam('user');
    let total = 0;
    let yourTotal = 0;
    return (
      <ScrollView>
        <View>
          <Text style={styles.name}>{this.state.name}</Text>
          <Card title="Items">
            {this.state.items &&
              this.state.items.map((item, i) => {
                let totalP = item.data.itemPrice * item.data.itemQty;
                total += totalP;
                if (item.data.sharedBy[user]) {
                  yourTotal +=
                    Math.floor(
                      (totalP /
                        Object.keys(item.data.sharedBy).filter(
                          member => item.data.sharedBy[member] === true
                        ).length) *
                        100
                    ) *
                    (1 / 100);
                }
                return (
                  <View
                    key={i}
                    style={{
                      // padding: 10,
                      // marginTop: 3,
                      borderBottomRadius: 5,
                      borderBottomWidth: 1,
                      // alignItems: 'center',
                      borderBottomColor: 'gray',
                      // borderColor: 'gray',
                      // overflow: 'hidden',
                      backgroundColor: item.data.sharedBy[user]
                        ? '#b3daf7'
                        : 'white'
                    }}
                  >
                    <View
                      style={{
                        borderBottomWidth: 3,
                        borderLeftWidth: 3,
                        borderColor: 'pink',
                        backgroundColor: 'pink',
                        color: 'white',
                        alignSelf: 'flex-end'
                      }}
                    >
                      <Icon
                        name="clear"
                        onPress={() => this.handleRm(item, i)}
                      />
                    </View>
                    <ListItem
                      key={i}
                      title={`${item.data.itemName} x${
                        item.data.itemQty
                      } : $${item.data.itemPrice * item.data.itemQty}`}
                      subtitle={
                        item &&
                        `${Object.keys(item.data.sharedBy)
                          .filter(member => item.data.sharedBy[member] === true)
                          .join(', ')}`
                      }
                      onPress={() => {
                        let newMembers = item.data.sharedBy;
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
                  </View>
                );
              })}
          </Card>
          <AddModal
            isModalVisible={this.state.isModalVisible}
            toggleModal={this.toggleModal}
            eventId={this.props.navigation.getParam('eventId')}
            height={height}
            width={width}
          />
          <TouchableOpacity
            onPress={() => {
              this.toggleModal();
            }}
          >
            <Text style={styles.button}>Add Item</Text>
          </TouchableOpacity>

          <Text style={styles.total}>TEAM TOTAL: $ {total}</Text>
          <Text style={styles.total}>Your Total: $ {yourTotal}</Text>
        </View>
      </ScrollView>
    );
  }
}
