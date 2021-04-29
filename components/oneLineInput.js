import React, { PureComponent } from 'react';
import {
  TextInput,
} from 'react-native';

export default class OneLineInput extends PureComponent {
  render() {
    return (
      <TextInput
        placeholder={this.props.placeholder}
        defaultValue={this.props.defaultValue}
        onEndEditing={this.props.isNotEnd ? null : () => this.props.onEndEditing()}
        onChangeText={(val) => this.props.onChangeText(val)}
        style={{
          height: 40,
          width: '98%',
          color: this.props.isBlack ? '#000' : '#fff',
          borderColor: this.props.isBlack ? '#000' : '#fff',
          borderWidth: 1,
          margin: 4,
          padding: 4,
        }}
      />
    );
  }
}
