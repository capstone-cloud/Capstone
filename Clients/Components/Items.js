import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Button
} from 'react-native';
import { ListItem, Card, Icon } from 'react-native-elements';
import { firestore, auth } from '../../fire';
import AddModal from './AddModal';
import styles from './Style';
import { API_KEY_CLOUD } from '../../Constants';
import SignOut from './SignOut';

export default class Items extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Items',
      headerLeft: (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Events', {
              groupId: navigation.getParam('groupId'),
              groupname: navigation.getParam('groupname'),
              user: navigation.getParam('user')
            })
          }
        >
          <Icon name="keyboard-arrow-left" color="white" />
        </TouchableOpacity>
      ),

      headerRight: <SignOut navigate={navigation.navigate} />
    };
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
    this.unsubscribe = firestore
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

  componentWillUnmount() {
    this.unsubscribe();
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

  async pleaseWork() {
    const body = {
      requests: [
        {
          image: {
            source: {
              imageUri:
                'https://sunnymoney.weebly.com/uploads/1/9/6/4/19645963/veggie-grocery-receipt_orig.jpeg'
            }
          },
          features: [
            {
              type: 'DOCUMENT_TEXT_DETECTION'
            }
          ]
        }
      ]
    };
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY_CLOUD}`,
      {
        method: 'POST',
        body: JSON.stringify(body)
      }
    );
    const parsed = await response.json();
    let blocks = parsed.responses[0].fullTextAnnotation.pages[0].blocks;
    //let words = blocks[0].paragraphs[0].words;
    const makeLine = (dict, x, y, part) => {
      let range = [];
      for (let i = y - 5; i < y + 5; i++) {
        range.push(i);
      }
      for (let each of range) {
        // ** if on the same line
        if (dict.hasOwnProperty(each)) {
          if (x > 300) {
            dict[each].price += part;
          } else {
            dict[each].item += part;
          }
          return;
        }
      }
      // ** if on a different line
      if (x > 300) {
        dict[y] = {
          item: '',
          price: part
        };
      } else {
        dict[y] = {
          item: part,
          price: ''
        };
      }
    };

    let dictionary = {};
    for (let block of blocks) {
      block.paragraphs.forEach(paragraph =>
        paragraph.words.forEach(word => {
          let x = word.boundingBox.vertices[0].x;
          let y = word.boundingBox.vertices[0].y;
          let part = word.symbols.map(symbol => symbol.text).join('');
          makeLine(dictionary, x, y, part);
        })
      );
    }
    //console.log(dictionary);

    const batch = firestore.batch();
    for (let itemKey in dictionary) {
      let item = dictionary[itemKey];
      if (
        item.price &&
        !isNaN(item.price.slice(1)) &&
        item.item.toLowerCase() !== 'total' &&
        item.item.toLowerCase() !== 'subtotal' &&
        item.price.includes('$')
      ) {
        let price = item.price[0] === '$' ? item.price.slice(1) : item.price;
        firestore
          .collection('events')
          .doc(this.props.navigation.getParam('eventId'))
          .collection('items')
          .add({
            itemName: item.item,
            itemPrice: price,
            itemQty: '1',
            sharedBy: {}
          });
      }
    }
    batch
      .commit()
      .then(() => alert('Added!!'))
      .catch(error => alert(error.message));
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
          <Text style={styles.name}>
            {this.props.navigation.getParam('eventname')}
          </Text>
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
                      borderBottomRadius: 5,
                      borderBottomWidth: 1,
                      borderBottomColor: 'gray',
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
            style={{ paddingBottom: 50 }}
            onPress={() => {
              this.toggleModal();
            }}
          >
            <Text style={styles.button}>Add Item</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => this.pleaseWork()}>
            <Text style={styles.name}> Scan </Text>
          </TouchableOpacity> */}
        </View>
        <View style={{ paddingTop: 50 }}>
          <Text style={styles.total}>TEAM TOTAL: $ {total}</Text>
          <Text style={styles.total}>Your Total: $ {yourTotal}</Text>
        </View>
      </ScrollView>
    );
  }
}
