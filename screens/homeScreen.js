import React, { PureComponent } from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import CommonContainer from '../components/commonContainer';
import TitleText from '../components/titleText';
import TaskCard from '../components/taskCard';
import ScheduleCard from '../components/scheduleCard';
import { getScheduleForHome } from '../repository/scheduleRepository';
import { getTaskForHome } from '../repository/taskRepository';
import { getSetting } from '../repository/settingRepository';
import init from '../repository/init';

export default class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);

    getSetting()
      .then((res) => {
        // ゴミ箱３ヶ月経過データ削除
      })
      .catch(() => {
        init();
      });

    this.state = {
      mostRecentSchedules: [],
      importantTasks: [],
    };
  }

  componentDidMount() {
    const today = new Date();
    getScheduleForHome({ date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}` })
      .then((res) => {
        this.setState({
          mostRecentSchedules: res,
        });
      });
    getTaskForHome()
      .then((res) => {
        this.setState({
          importantTasks: res,
        });
      });
  }

  onTaskPressAction(taskId) {
    this.props.navigation.push('TaskData', {
      taskId,
    });
  }

  onSchedulePressAction(scheId) {
    this.props.navigation.push('ScheduleDataOne', {
      scheId,
    });
  }

  render() {
    const date = new Date();
    const dayOfTheWeek = ['日', '月', '火', '水', '木', '金', '土'];
    const today = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
      day: dayOfTheWeek[date.getDay()],
    };
    const { mostRecentSchedules, importantTasks } = this.state;

    return (
      <CommonContainer navigation={this.props.navigation} title="Home">
        <View style={styles.today}>
          <TitleText>
            {today.year}
            年
            {today.month}
            月
            {today.date}
            日(
            {today.day}
            )
          </TitleText>
        </View>
        <TitleText>なるはやタスク</TitleText>
        {
          importantTasks.map((item) => (
            <TaskCard
              key={item.task_id}
              isChecked={false}
              createdAt={new Date(item.created_at.replace(' ', 'T'))}
              title={item.title}
              onPressAction={() => this.onTaskPressAction(item.task_id)}
            />
          ))
        }
        <TitleText>直近のスケジュール</TitleText>
        {
          mostRecentSchedules.map((item) => (
            <ScheduleCard
              key={item.sche_id}
              title={item.content}
              date={item.sche_date}
              onPressAction={() => this.onSchedulePressAction(item.sche_id)}
            />
          ))
        }
      </CommonContainer>
    );
  }
}

const styles = StyleSheet.create({
  today: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
