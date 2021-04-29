import React, { PureComponent } from 'react';
import {
  View, StyleSheet, Text, TextInput,
} from 'react-native';
import { addSchedule } from '../repository/scheduleRepository';
import CommonContainer from '../components/commonContainer';
import NormalButton from '../components/normalButton';

export default class CreateScheduleScreen extends PureComponent {
  constructor(props) {
    super(props);
    let targetDate;
    if (this.props.route.params !== undefined && this.props.route.params.date !== undefined) {
      targetDate = this.props.route.params.date;
    } else {
      this.props.navigation.push('Home');
    }
    this.state = {
      targetDate,
      content: null,
    };
  }

  addScheduleData() {
    const { targetDate, content } = this.state;

    addSchedule({
      date: `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`,
      content,
    });

    this.props.navigation.push('ScheduleData', {
      date: targetDate,
    });
  }

  changeContent(val) {
    this.setState({
      content: val,
    });
  }

  render() {
    const { targetDate } = this.state;
    const dateString = `${targetDate.getFullYear()}年${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;

    return (
      <CommonContainer navigation={this.props.navigation} title={`${dateString} 新規作成`}>
        <View style={{ height: 20 }} />
        <View style={styles.createButtonContainer}>
          <NormalButton
            style={{ margin: 4, width: '98%' }}
            onPressAction={() => this.addScheduleData()}
          >
            新規作成する
          </NormalButton>
        </View>
        <Text style={styles.titleText}>内容</Text>
        <TextInput
          style={{
            height: 40,
            color: '#fff',
            borderColor: '#fff',
            borderWidth: 1,
            margin: 4,
          }}
          onChangeText={(val) => this.changeContent(val)}
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
    maxHeight: 40,
  },
  titleText: {
    color: '#fff',
  },
  modalButton: {
    marginTop: 10,
    width: '98%',
  },
});
