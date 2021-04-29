import React, { PureComponent } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';

export default class NormalButton extends PureComponent {
  render() {
    return (
      <View style={this.props.style}>
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

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#19f',
    color: '#fff',
    padding: 5,
    borderRadius: 10,
    height: 32,
  },
  buttonText: {
    color: '#fff',
  },
});
