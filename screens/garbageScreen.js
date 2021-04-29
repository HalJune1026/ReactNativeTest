import React, { PureComponent } from 'react';
import {
  Text, View, StyleSheet,
} from 'react-native';
import Modal from 'react-native-modal';
import CommonContainer from '../components/commonContainer';
import TitleText from '../components/titleText';
import TaskCard from '../components/taskCard';
import ScheduleCard from '../components/scheduleCard';
import NormalButton from '../components/normalButton';
import { getDeletedScheduleData, deleteScheduleCompletely, restoreScheduleData } from '../repository/scheduleRepository';
import { getDeletedTaskData, deleteTaskCompletely, restoreTaskData } from '../repository/taskRepository';

export default class HomeScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      tasks: [],
      deleteTitle: null,
      deleteId: null,
      deleteType: null,
    };
  }

  componentDidMount() {
    getDeletedScheduleData()
      .then((res) => {
        this.setState({
          schedules: res,
        });
      });
    getDeletedTaskData()
      .then((res) => {
        this.setState({
          tasks: res,
        });
      });
  }

  onTaskPressAction(data) {
    this.setState({
      deleteTitle: data.title,
      deleteId: data.task_id,
      deleteType: 'task',
      isDeleteModalVisible: true,
    });
  }

  onSchedulePressAction(data) {
    this.setState({
      deleteTitle: data.content,
      deleteId: data.sche_id,
      deleteType: 'schedule',
      isDeleteModalVisible: true,
    });
  }

  restoreData() {
    if (this.state.deleteType === 'task') {
      restoreTaskData({
        taskId: this.state.deleteId,
      });
    } else if (this.state.deleteType === 'schedule') {
      restoreScheduleData({
        scheId: this.state.deleteId,
      });
    }

    this.hideModal();
    this.props.navigation.push('Garbage');
  }

  deleteDataCompletely() {
    if (this.state.deleteType === 'task') {
      deleteTaskCompletely({
        taskId: this.state.deleteId,
      });
    } else if (this.state.deleteType === 'schedule') {
      deleteScheduleCompletely({
        scheId: this.state.deleteId,
      });
    }

    this.hideModal();
    this.props.navigation.push('Garbage');
  }

  hideModal() {
    this.setState({
      isDeleteModalVisible: false,
    });
  }

  render() {
    const { schedules, tasks } = this.state;

    return (
      <CommonContainer navigation={this.props.navigation} title="Garbage">
        <TitleText>削除したタスク</TitleText>
        {
          tasks.map((item) => (
            <TaskCard
              key={item.task_id}
              isChecked={item.is_checked}
              createdAt={item.created_at}
              title={item.title}
              onPressAction={() => this.onTaskPressAction(item)}
            />
          ))
        }
        <TitleText>削除したスケジュール</TitleText>
        {
          schedules.map((item) => (
            <ScheduleCard
              key={item.sche_id}
              title={item.content}
              date={item.sche_date}
              onPressAction={() => this.onSchedulePressAction(item)}
            />
          ))
        }

        <Modal isVisible={this.state.isDeleteModalVisible}>
          <View style={{ height: 170 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Text>{this.state.deleteTitle}</Text>
              <NormalButton
                style={styles.modalButton}
                onPressAction={() => this.restoreData()}
              >
                元に戻す
              </NormalButton>
              <NormalButton
                style={styles.modalButton}
                onPressAction={() => this.deleteDataCompletely()}
              >
                完全に削除する
              </NormalButton>
              <NormalButton
                style={styles.modalButton}
                onPressAction={() => this.hideModal()}
              >
                閉じる
              </NormalButton>
              <View style={{ height: 15 }} />
            </View>
          </View>
        </Modal>
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
  modalButton: {
    marginTop: 10,
    width: '98%',
  },
});
