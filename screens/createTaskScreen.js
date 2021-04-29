import React, { PureComponent } from 'react';
import {
  View, StyleSheet, Text, TextInput,
} from 'react-native';
import { addTask } from '../repository/taskRepository';
import CommonContainer from '../components/commonContainer';
import NormalButton from '../components/normalButton';

export default class CreateTaskScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      isImportant: 1,
    };
  }

  onChangeTitle(val) {
    this.setState({
      title: val,
    });
  }

  onChangeContent(val) {
    this.setState({
      content: val,
    });
  }

  toggleOption() {
    const { isImportant } = this.state;
    this.setState({
      isImportant: 1 - isImportant,
    });
  }

  createTask() {
    if (this.state.content === '') {
      return;
    }

    addTask({
      title: this.state.title,
      content: this.state.content,
      isImportant: this.state.isImportant,
    });

    this.props.navigation.push('Task');
  }

  render() {
    return (
      <CommonContainer navigation={this.props.navigation} title="タスク作成">
        <View style={styles.createButtonContainer}>
          <NormalButton
            style={{ margin: 4, width: '98%' }}
            onPressAction={() => this.createTask()}
          >
            新規作成する
          </NormalButton>
        </View>
        <View style={styles.optionContainer}>
          <NormalButton
            style={[styles.optionButton, { opacity: this.state.isImportant ? 1.0 : 0.5 }]}
            onPressAction={() => this.toggleOption()}
          >
            なるはや
          </NormalButton>
          <NormalButton
            style={[styles.optionButton, { opacity: !this.state.isImportant ? 1.0 : 0.5 }]}
            onPressAction={() => this.toggleOption()}
          >
            ふつう
          </NormalButton>
        </View>
        <Text style={styles.titleText}>タイトル</Text>
        <TextInput
          style={{
            height: 40,
            color: '#fff',
            borderColor: '#fff',
            borderWidth: 1,
            margin: 4,
          }}
          maxLength={20}
          onChangeText={(val) => this.onChangeTitle(val)}
        />
        <Text style={styles.titleText}>内容</Text>
        <TextInput
          style={{
            height: 200,
            textAlignVertical: 'top',
            color: '#fff',
            borderWidth: 1,
            borderColor: '#fff',
            margin: 4,
          }}
          multiline
          maxLength={500}
          onChangeText={(val) => this.onChangeContent(val)}
        />
      </CommonContainer>
    );
  }
}

const styles = StyleSheet.create({
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    maxHeight: 40,
    margin: 4,
  },
  optionButton: {
    margin: 4,
    width: '48%',
  },
  createButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: 80,
    height: 80,
  },
  titleText: {
    color: '#fff',
  },
  modalButton: {
    marginTop: 10,
    width: '98%',
  },
});
