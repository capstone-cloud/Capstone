import React, { Component } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { View, Button, Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { ListItem, Icon } from "react-native-elements";

class EventItem extends Component {
  constructor(props) {
    super(props);
  }
  renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 0, 0, 1]
    });

    return (
      <View 
      onPress={this.close}
      style={{
        flex:0.3,
        flexDirection:"row",
        justifyContent: "space-around"
      }}>
        
        <RectButton
          style={{
            flex:1,
            flexDirection:"column",
            justifyContent:"space-evenly"
          }}
          width="50%"
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
          <Icon name="assignment"/>
        </RectButton>
        <RectButton
          style={{
            flex:1,
            flexDirection:"column",
            justifyContent:"space-evenly"
                  }}
          width="50%"
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
          <Icon name="edit"/>
        </RectButton>
      </View>
    );
  };
  render() {
    return (
      <Swipeable renderRightActions={this.renderRightActions}>
        <ListItem 
        title={this.props.event.eventname}
        rightIcon={{name: 'more', color:"purple"} }
         />
      </Swipeable>
    );
  }
}

export default EventItem;
