import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

export default class TaskCard extends PureComponent {
  render() {
    const { createdAt } = this.props;
    const dateStr = `${createdAt.getFullYear()}年${createdAt.getMonth() + 1}月${createdAt.getDate()}日`;

    return (
      <TouchableOpacity
        onPress={() => this.props.onPressAction()}
        style={[styles.button, { backgroundColor: this.props.isImportant ? '#fcc' : '#fff' }]}
      >
        <View style={{ width: '100%' }}>
          <Text style={styles.buttonText}>
            <Icon name={this.props.isChecked ? 'check-square' : 'square'} size={20} />
            <Text>  </Text>
            作成日：
            {dateStr}
          </Text>
          <Divider />
          <Text style={styles.buttonText}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    color: '#000',
    borderColor: '#00f',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    margin: 3,
  },
  buttonText: {
    color: '#000',
  },
});
