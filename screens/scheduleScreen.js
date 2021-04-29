import React, { PureComponent } from 'react';
import {
  View, StyleSheet, Text, Pressable,
} from 'react-native';
import Modal from 'react-native-modal';
import { getMonthScheduleData } from '../repository/scheduleRepository';
import CommonContainer from '../components/commonContainer';
import NormalButton from '../components/normalButton';

export default class ScheduleScreen extends PureComponent {
  constructor(props) {
    super(props);

    if (this.props.route.params !== undefined && this.props.route.params.year !== undefined) {
      this.state = {
        targetDay: new Date(this.props.route.params.year, this.props.route.params.month),
        currndarDays: [],
      };
    } else {
      const today = new Date();
      today.setDate(1);
      this.state = {
        targetDay: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        currndarDays: [],
      };
    }
  }

  componentDidMount() {
    this.makeCurrender(new Date(this.state.targetDay));
  }

  makeDate(date) {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  makeCurrender(date) {
    const firstDayMonth = new Date(date.setDate(1));
    const nextMonth = new Date(date.setMonth(date.getMonth() + 1));
    const lastDayMonth = new Date(nextMonth.setDate(0));

    const calendar = [];
    let calenderDay = firstDayMonth;

    // not Sunday
    if (firstDayMonth.getDay() !== 0) {
      let yesterDay = new Date(firstDayMonth.setDate(firstDayMonth.getDate() - 1));
      while (yesterDay.getDay() !== 0) {
        yesterDay = new Date(yesterDay.setDate(yesterDay.getDate() - 1));
      }
      calenderDay = yesterDay;
    }
    calenderDay = new Date(calenderDay.setDate(calenderDay.getDate() - 1));

    for (let i = 0; i < 45; i += 1) {
      calenderDay = new Date(calenderDay.setDate(calenderDay.getDate() + 1));
      calendar.push({
        date: new Date(calenderDay),
        isHoliday: calenderDay.getDay() === 0 || calenderDay.getDay() === 6,
      });

      if (calenderDay.getTime() === lastDayMonth.getTime()) {
        break;
      }
    }
    // till Saturday
    if (lastDayMonth.getDay() !== 6) {
      let tomorrow = new Date(lastDayMonth.setDate(lastDayMonth.getDate()));
      do {
        tomorrow = new Date(tomorrow.setDate(tomorrow.getDate() + 1));
        calendar.push({
          date: new Date(tomorrow),
          isHoliday: tomorrow.getDay() === 0 || tomorrow.getDay() === 6,
        });
      } while (tomorrow.getDay() !== 6);
    }

    // load schedule data
    getMonthScheduleData({
      fromDate: this.makeDate(calendar[0].date),
      toDate: this.makeDate(calendar.slice(-1)[0].date),
    })
      .then((res) => {
        const calendarData = [];
        res.forEach((item) => {
          if (calendarData[item.sche_date] === undefined) {
            calendarData[item.sche_date] = [];
          }
          if (calendarData[item.sche_date].length < 2) {
            calendarData[item.sche_date].push(item);
          }
        });

        const retCalendar = [];
        calendar.forEach((item) => {
          if (calendarData[this.makeDate(new Date(item.date))] !== undefined) {
            retCalendar.push({
              ...item,
              data: calendarData[this.makeDate(new Date(item.date))].slice(),
            });
          } else {
            retCalendar.push({ ...item, data: [] });
          }
        });
        this.setState({
          currndarDays: retCalendar,
        });
      });
  }

  moveToMonth(count) {
    const { targetDay } = this.state;
    const moveYearMonth = new Date(targetDay.setMonth(targetDay.getMonth() + count));

    this.setState({
      targetDay: new Date(moveYearMonth),
    });
    this.makeCurrender(moveYearMonth);
  }

  moveToOneDate(date) {
    this.props.navigation.push('ScheduleData', {
      date,
    });
  }

  render() {
    const dayOfTheWeek = ['日', '月', '火', '水', '木', '金', '土'];

    return (
      <CommonContainer navigation={this.props.navigation} title="Schedule">
        <View style={styles.centerContainer}>
          <Pressable
            style={{ width: '25%' }}
            onPress={() => this.moveToMonth(-1)}
          >
            <Text style={styles.text}>
              前月
            </Text>
          </Pressable>
          <Pressable
            style={{ width: '50%' }}
            onPress={() => this.moveToSelectMonth()}
          >
            <Text style={styles.mainText}>
              {this.state.targetDay.getFullYear()}
              年
              {this.state.targetDay.getMonth() + 1}
              月
            </Text>
          </Pressable>
          <Pressable
            style={{ width: '25%' }}
            onPress={() => this.moveToMonth(1)}
          >
            <Text style={styles.text}>
              翌月
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            margin: 4,
            flexWrap: 'wrap',
          }}
        >
          {dayOfTheWeek.map((item) => (
            <View
              key={item}
              style={{
                width: '14%',
                height: 20,
                borderColor: '#fff',
                borderWidth: 1,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12, textAlign: 'center' }}>
                {item}
              </Text>
            </View>
          ))}
          {this.state.currndarDays.map((item) => (
            <Pressable
              key={`0${item.date.getMonth()}${item.date.getDate()}`}
              style={{
                width: '14%',
                height: '14%',
                borderColor: '#fff',
                borderWidth: 1,
              }}
              onPress={() => this.moveToOneDate(item.date)}
            >
              <Text
                style={{
                  color: item.isHoliday ? '#f00' : '#fff',
                  textAlign: 'center',
                }}
              >
                {item.date.getDate()}
              </Text>
              {item.data.map((dataItem) => (
                <Text
                  key={dataItem.sche_id}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ color: '#99f', fontSize: 12 }}
                >
                  {dataItem.content}
                </Text>
              ))}
            </Pressable>
          ))}
        </View>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ height: 150 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Text>チェックを外しますか？</Text>
              <NormalButton
                style={styles.modalButton}
                onPressAction={() => this.removeCheck()}
              >
                はい
              </NormalButton>
              <NormalButton
                style={styles.modalButton}
                onPressAction={() => this.toggleModal()}
              >
                いいえ
              </NormalButton>
            </View>
          </View>
        </Modal>
      </CommonContainer>
    );
  }
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    maxHeight: 40,
  },
  textContainer: {
  },
  mainText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 28,
  },
  text: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 28,
  },
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
  titleText: {
    color: '#fff',
  },
  modalButton: {
    marginTop: 10,
    width: '98%',
  },
});
