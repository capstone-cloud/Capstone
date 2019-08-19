import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { API_KEY_CLOUD } from '../../Constants';
import { firestore } from '../../fire';
import { manipulateAsync } from 'expo-image-manipulator';
export default class OurCamera extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    picture: false,
    img: {},
    photo: {}
  };
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  snap = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync({
        base64: true
      });
      let thePhoto = await manipulateAsync(
        photo.uri,
        [{ resize: { width: 900 } }],
        {
          base64: true
        }
      );
      //console.log(photo.width, photo.height);
      console.log(thePhoto.width, thePhoto.height);
      this.setState({ img: thePhoto, picture: true, photo });
    }
  };
  async pleaseWork(img) {
    const body = {
      requests: [
        {
          image: {
            content: img
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
      for (let i = y - 20; i < y + 20; i++) {
        range.push(i);
      }
      for (let each of range) {
        // ** if on the same line
        if (dict.hasOwnProperty(each)) {
          console.log('exist line', x, y);
          if (x > 600) {
            dict[each].price += part;
          } else {
            dict[each].item += part;
          }
          return;
        }
      }
      // ** if on a different line
      //   console.log('new line', x, y);
      if (x > 600) {
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
          if (part !== '$') makeLine(dictionary, x, y, part);
        })
      );
    }
    const batch = firestore.batch();
    for (let itemKey in dictionary) {
      let item = dictionary[itemKey];
      if (
        item.price &&
        !isNaN(item.price) &&
        !item.item.toLowerCase().includes('total')
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
    const { navigate, getParam } = this.props.navigation;
    navigate('Items', {
      eventId: getParam('eventId'),
      userId: getParam('userId'),
      user: getParam('user')
    });
  }
  render() {
    const { height, width } = Dimensions.get('window');
    const { navigate, getParam } = this.props.navigation;
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      if (!this.state.picture) {
        return (
          <View style={{ flex: 1 }}>
            <Camera
              ref={ref => {
                this.camera = ref;
              }}
              style={{ flex: 1 }}
              type={this.state.type}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'column-reverse',
                  alignSelf: 'center'
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'center'
                  }}
                  onPress={() => {
                    this.snap();
                  }}
                >
                  <Icon
                    style={{ alignSelf: 'center' }}
                    size={50}
                    name="camera"
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </Camera>
          </View>
        );
      } else {
        return (
          <View style={{ backgroundColor: 'lightpink' }}>
            <Image
              style={{
                width: width * 0.7,
                height: height * 0.7,
                alignSelf: 'center'
              }}
              source={{
                uri: this.state.photo.uri
              }}
            />

            <TouchableOpacity
              style={{
                backgroundColor: 'lightpink',
                borderTopColor: 'white',
                borderTopWidth: 2
              }}
              onPress={() =>
                this.setState({
                  type: Camera.Constants.Type.back,
                  picture: false,
                  img: {},
                  photo: {}
                })
              }
            >
              <Text style={styles.retake}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: 'lightpink',
                borderTopColor: 'white',
                borderTopWidth: 2
              }}
              onPress={() => {
                this.pleaseWork(this.state.img.base64);
              }}
            >
              <Text style={styles.retake}>Scan</Text>
            </TouchableOpacity>
            {/* </View> */}
          </View>
        );
      }
    }
  }
}
