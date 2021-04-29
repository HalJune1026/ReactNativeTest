import React, { PureComponent } from 'react';
import {
  View, ScrollView, StyleSheet,
} from 'react-native';
import { getDateData } from '../repository/scheduleRepository';
import CommonContainer from '../components/commonContainer';
import NormalButton from '../components/normalButton';
import ScheduleCard from '../components/scheduleCard';

export default class ScheduleDataScreen extends PureComponent {
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
      scheduleList: [],
    };
  }

  componentDidMount() {
    const { targetDate } = this.state;
    getDateData({
      date: `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`,
    })
      .then((response) => {
        this.setState({
          scheduleList: response,
        });
      });
  }

  onPressAction(scheId) {
    this.props.navigation.push('ScheduleDataOne', {
      scheId,
    });
  }

  render() {
    const { targetDate } = this.state;
    const targetDateString = `${targetDate.getFullYear()}年${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;
    return (
      <CommonContainer navigation={this.props.navigation} title={targetDateString}>
        <View style={styles.topContainer}>
          <View style={{ height: 10 }} />
          <NormalButton
            style={styles.button}
            onPressAction={() => this.props.navigation.push('CreateSchedule', {
              date: targetDate,
            })}
          >
            新規作成
          </NormalButton>
          <View style={{ height: 10 }} />
        </View>
        <View style={{ height: 10 }} />
        <ScrollView>
          {this.state.scheduleList.map((item) => (
            <ScheduleCard
              isScheduleView
              date={item.created_at.split(' ')[0]}
              key={item.sche_id}
              title={item.content}
              onPressAction={() => this.onPressAction(item.sche_id)}
            />
          ))}
          <View style={{ height: 30 }} />
        </ScrollView>
      </CommonContainer>
    );
  }
}

const styles = StyleSheet.create({
  mainText: {
    color: '#fff',
    fontSize: 28,
    width: '100%',
    textAlign: 'center',
  },
  button: {
    margin: 4,
    width: '98%',
  },
  buttonText: {
    color: '#fff',
  },
  modalButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '98%',
    height: 32,
    margin: 5,
  },
  modalButton: {
    margin: 4,
    width: '30%',
    height: 28,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 24,
    height: 28,
  },
  modalCloseButton: {
    margin: 4,
    width: '95%',
  },
});
