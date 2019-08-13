import React, { Component } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { View, Button, Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { ListItem } from "react-native-elements";

class GroupItem extends Component {
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
            this.props.navigate("Events", {
              groupId: this.props.id,
              groupname: this.props.group.groupname
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
            Events
          </Animated.Text>
        </RectButton>
        <RectButton
          style={styles.leftAction}
          backgroundColor="pink"
          onPress={() => {
            this.props.navigate("UpdateGroup", {
              groupname: this.props.group.groupname,
              groupId: this.props.id,
              members: this.props.group.members
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
        <RectButton
          style={styles.leftAction}
          backgroundColor="#87ceeb"
          onPress={() => console.log("Chat")}
        >
          <Animated.Text
            style={[
              styles.actionText,
              {
                transform: [{ translateX: trans }]
              }
            ]}
          >
            Chat
          </Animated.Text>
        </RectButton>
      </View>
    );
  };
  render() {
    return (
      <Swipeable renderRightActions={this.renderRightActions}>
        <ListItem
          title={this.props.group.groupname}
          subtitle={this.props.returnSubtitle(this.props.group.members)}
        />
      </Swipeable>
    );
  }
}

export default GroupItem;
