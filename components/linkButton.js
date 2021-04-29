import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 4,
    width: '47%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#33c',
    color: '#fff',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default class LinkButton extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.onPressAction()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {this.props.children}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
