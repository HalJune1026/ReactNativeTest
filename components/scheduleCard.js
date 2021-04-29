import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import { Divider } from 'react-native-elements';

export default class ScheduleCard extends PureComponent {
  render() {
    const dateStr = this.props.date.split('-');

    return (
      <TouchableOpacity
        onPress={() => this.props.onPressAction()}
        style={[styles.button, { backgroundColor: this.props.isImportant ? '#fcc' : '#fff' }]}
      >
        <View style={{ width: '100%' }}>
          <Text style={styles.buttonText}>
            {this.props.isScheduleView ? '作成日:' : null}
            {dateStr[0]}
            年
            {dateStr[1]}
            月
            {dateStr[2]}
            日
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
    borderColor: '#0f0',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    margin: 3,
  },
  buttonText: {
    color: '#000',
  },
});
