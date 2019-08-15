import React, { Component } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { View, Button, Animated } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { ListItem, Icon} from "react-native-elements";



class GroupItem extends Component {
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
      <View 
      onPress={this.close}
      style={{
        flex:0.5,
        flexDirection:"row",
        justifyContent: "space-around"
      }}>
        <RectButton
          style={{
            flex:1,
            flexDirection:"column",
            justifyContent:"space-evenly"
          }}
          width="33%"
          backgroundColor="#FA8072"
          onPress={() => {
            console.log(this.props)
            this.props.navigate("Events", {
              groupId: this.props.id,
              groupname: this.props.group.groupname,
              user: this.props.user
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
          <Icon name="assignment"/>
        </RectButton>
        <RectButton
          style={{flex:1,
            flexDirection:"column",  justifyContent:"space-evenly"}}
          width="33%"
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
          <Icon name="edit"/>
        </RectButton>
        <RectButton
          style={{flex:1, flexDirection:"column",  justifyContent:"space-evenly"}}
          width="33%"
          backgroundColor="#87ceeb"
          onPress={() => this.props.navigate("Chat", {
            groupId: this.props.id,
            user: this.props.user
          })}
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
          <Icon name="chat"/>
        </RectButton>
      </View>
    );
  };
  render() {
    return (
      <Swipeable 
      renderRightActions={this.renderRightActions}
      rightThreshold={0.001}>
        <ListItem
          title={this.props.group.groupname}
          subtitle={this.props.returnSubtitle(this.props.group.members)}
          rightIcon={{name: 'more', color:"pink"} }
        />
      </Swipeable>
    );
  }
}

export default GroupItem;
