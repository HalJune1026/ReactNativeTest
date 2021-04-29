import React, { PureComponent } from 'react';
import {
  View, ScrollView, StyleSheet, Text,
} from 'react-native';
import Modal from 'react-native-modal';
import { getTaskList, addTaskList, searchTasks } from '../repository/taskRepository';
import CommonContainer from '../components/commonContainer';
import NormalButton from '../components/normalButton';
import TaskCard from '../components/taskCard';
import OneLineInput from '../components/oneLineInput';

export default class TaskScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      isModalVisible: false,
      taskType: 'all',
      taskState: 'all',
      searchWord: null,
      isSearchMode: false,
    };
  }

  componentDidMount() {
    this.getList();
  }

  onPressAction(taskId) {
    this.props.navigation.push('TaskData', {
      taskId,
    });
  }

  getList() {
    const condition = this.makeListCondition();

    getTaskList({
      taskTypeCondition: condition.taskTypeCondition,
      taskStateCondition: condition.taskStateCondition,
      orderKey: 'task_id',
      order: 'DESC',
      limitCount: 10,
    })
      .then((response) => {
        this.setState({
          taskList: response,
        });
      });
  }

  makeListCondition() {
    let taskTypeCondition = '';
    if (this.state.taskType === 'important') {
      taskTypeCondition = 'is_important = 1 AND';
    } else if (this.state.taskType === 'normal') {
      taskTypeCondition = 'is_important = 0 AND';
    }

    let taskStateCondition = '';
    if (this.state.taskState === 'checked') {
      taskStateCondition = 'is_checked = 1 AND';
    } else if (this.state.taskState === 'noChecked') {
      taskStateCondition = 'is_checked = 0 AND';
    }

    return {
      taskTypeCondition,
      taskStateCondition,
    };
  }

  addTaskList() {
    if (this.state.isSearchMode) {
      return;
    }
    const { taskList } = this.state;
    const lastTask = taskList.slice(-1)[0];
    const condition = this.makeListCondition();

    addTaskList({
      taskTypeCondition: condition.taskTypeCondition,
      taskStateCondition: condition.taskStateCondition,
      lastTaskId: lastTask.task_id,
      orderKey: 'task_id',
      order: 'DESC',
      limitCount: 10,
    })
      .then((response) => {
        this.setState({
          taskList: taskList.concat(response).slice(),
        });
      });
  }

  changeSearchWord(val) {
    this.setState({
      searchWord: val,
    });
  }

  searchTasks() {
    const { searchWord } = this.state;
    if (searchWord === '') {
      this.getList();
      return;
    }
    if (searchWord === this.state.beforeSearchWord) {
      return;
    }

    const condition = this.makeListCondition();
    searchTasks({
      taskTypeCondition: condition.taskTypeCondition,
      taskStateCondition: condition.taskStateCondition,
      word: searchWord,
      limitCount: 10,
    })
      .then((response) => {
        this.setState({
          taskList: response.slice(),
        });
      });

    this.setState({
      beforeSearchWord: searchWord,
      isSearchMode: true,
    });
  }

  toggleModal() {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  }

  selectTaskType(taskType) {
    this.setState({ taskType });
    setTimeout(() => this.getList(), 500);
  }

  selectTaskState(taskState) {
    this.setState({ taskState });
    setTimeout(() => this.getList(), 500);
  }

  render() {
    return (
      <CommonContainer navigation={this.props.navigation} title="タスク">
        <OneLineInput
          placeholder="検索"
          onChangeText={(val) => this.changeSearchWord(val)}
          onEndEditing={() => this.searchTasks()}
        />
        <View style={{ height: 10 }} />
        <View style={styles.topContainer}>
          <NormalButton
            style={styles.button}
            onPressAction={() => this.props.navigation.push('CreateTask')}
          >
            新規作成
          </NormalButton>
          <View style={{ height: 10 }} />
          <NormalButton
            style={styles.button}
            onPressAction={() => this.toggleModal()}
          >
            表示・検索オプション
          </NormalButton>
        </View>
        <View style={{ height: 10 }} />
        <ScrollView onScrollEndDrag={() => this.addTaskList()}>
          {this.state.taskList.map((item) => (
            <TaskCard
              isImportant={item.is_important}
              key={item.task_id}
              isChecked={item.is_checked}
              createdAt={new Date(item.created_at.replace(' ', 'T'))}
              title={item.title}
              onPressAction={() => this.onPressAction(item.task_id)}
            />
          ))}
          <View style={{ height: 30 }} />
        </ScrollView>
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ height: 200, backgroundColor: '#fff' }}>
            <Text style={styles.modalText}>タスク種別</Text>
            <View style={styles.modalButtonContainer}>
              <NormalButton
                style={[styles.modalButton, { opacity: this.state.taskType === 'all' ? 1.0 : 0.5 }]}
                onPressAction={() => { this.selectTaskType('all'); }}
              >
                すべて
              </NormalButton>
              <NormalButton
                style={[styles.modalButton, { opacity: this.state.taskType === 'important' ? 1.0 : 0.5 }]}
                onPressAction={() => { this.selectTaskType('important'); }}
              >
                なるはや
              </NormalButton>
              <NormalButton
                style={[styles.modalButton, { opacity: this.state.taskType === 'normal' ? 1.0 : 0.5 }]}
                onPressAction={() => { this.selectTaskType('normal'); }}
              >
                通常
              </NormalButton>
            </View>
            <View style={{ height: 10 }} />
            <Text style={styles.modalText}>実行種別</Text>
            <View style={styles.modalButtonContainer}>
              <NormalButton
                style={[styles.modalButton, { opacity: this.state.taskState === 'all' ? 1.0 : 0.5 }]}
                onPressAction={() => { this.selectTaskState('all'); }}
              >
                すべて
              </NormalButton>
              <NormalButton
                style={[styles.modalButton, { opacity: this.state.taskState === 'checked' ? 1.0 : 0.5 }]}
                onPressAction={() => { this.selectTaskState('checked'); }}
              >
                実行済
              </NormalButton>
              <NormalButton
                style={[styles.modalButton, { opacity: this.state.taskState === 'noChecked' ? 1.0 : 0.5 }]}
                onPressAction={() => { this.selectTaskState('noChecked'); }}
              >
                未実行
              </NormalButton>
            </View>
            <View style={{ height: 20 }} />
            <View style={styles.modalButtonContainer}>
              <NormalButton
                style={styles.modalCloseButton}
                onPressAction={() => this.toggleModal()}
              >
                閉じる
              </NormalButton>
            </View>
            <View style={{ height: 10 }} />
          </View>
        </Modal>
      </CommonContainer>
    );
  }
}

const styles = StyleSheet.create({
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
