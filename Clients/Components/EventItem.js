import React, { Component } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { View, Button, Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";

class EventItem extends Component {
  static navigationOptions = {
    title: 'Splitzies!'
  };
  constructor(props) {
    super(props);
  }
  renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1]
    });

    return (
      <View onPress={this.close}>
        <RectButton
          style={styles.leftAction}
          backgroundColor="#FA8072"
          onPress={() => {
            this.props.navigate("Items", {
              eventId: this.props.id
            });
          }}
        >
          <Animated.Text
            style={[
              styles.actionText,
              {
                transform: [{ translateX: trans }]
              }
            ]}
          >
            Items
          </Animated.Text>
        </RectButton>
        <RectButton
          style={styles.leftAction}
          backgroundColor="pink"
          onPress={() => {
            this.props.navigate("UpdateEvent", {
              id: this.props.id,
              eventname: this.props.event.eventname,
              items: this.props.event.items,
              groupId: this.props.groupId
            });
          }}
        >
          <Animated.Text
            style={[
              styles.actionText,
              {
                transform: [{ translateX: trans }]
              }
            ]}
          >
            Edit
          </Animated.Text>
        </RectButton>
      </View>
    );
  };
  render() {
    return (
      <Swipeable renderRightActions={this.renderRightActions}>
        <ListItem title={this.props.event.eventname} />
      </Swipeable>
    );
  }
}

export default EventItem;
