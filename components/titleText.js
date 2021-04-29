import React, { PureComponent } from 'react';
import {
  Text,
} from 'react-native';

export default class TitleText extends PureComponent {
  render() {
    return (
      <Text style={{
        ...this.props.style,
        color: '#fff',
        fontSize: 25,
        width: '100%',
        textAlign: 'center',
      }}
      >
        {this.props.children}
      </Text>
    );
  }
}
