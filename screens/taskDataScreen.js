import React, { PureComponent } from 'react';
import {
  View, StyleSheet, Text, TextInput, Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  getTaskById,
  changeCheckState,
  changeImportantState,
  deleteTask,
  updateTaskContent,
} from '../repository/taskRepository';
import CommonContainer from '../components/commonContainer';
import NormalButton from '../components/normalButton';

export default class TaskScreen extends PureComponent {
  constructor(props) {
    super(props);
    let taskId;
    if (this.props.route.params !== undefined && this.props.route.params.taskId !== undefined) {
      taskId = this.props.route.params.taskId;
    } else {
      this.props.navigation.push('Home');
    }

    this.state = {
      taskId,
      isModalVisible: false,
      isDeleteModalVisible: false,
      isImportant: false,
      title: null,
      content: null,
      isChecked: null,
      titleUpdateMessage: null,
      contentUpdateMessage: null,
      isEndUpdateModalVisible: false,
    };
  }

  componentDidMount() {
    const { taskId } = this.state;
    getTaskById({ taskId })
      .then((response) => {
        this.setState({
          isImportant: response[0].is_important,
          title: response[0].title,
          content: response[0].content,
          isChecked: response[0].is_checked,
        });
      });
  }

  toggleCheck() {
    const { taskId, isChecked } = this.state;

    if (isChecked) {
      this.openModal();
    } else {
      changeCheckState({
        taskId,
        toCheckState: 1,
      });
      this.setState({
        isChecked: 1,
      });
    }
  }

  openModal() {
    this.setState({ isModalVisible: true });
  }

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  openDeleteModal() {
    this.setState({ isDeleteModalVisible: true });
  }

  closeDeleteModal() {
    this.setState({ isDeleteModalVisible: false });
  }

  removeCheck() {
    const { taskId } = this.state;
    changeCheckState({
      taskId,
      toCheckState: 0,
    });
    this.setState({ isChecked: 0, isModalVisible: false });
  }

  updateContent() {
    const { taskId, title, content } = this.state;
    if (content === '') {
      return;
    }

    updateTaskContent({
      taskId,
      title,
      content,
    });
    this.setState({ isEndUpdateModalVisible: true });
    setTimeout(() => this.setState({ isEndUpdateModalVisible: false }), 750);
  }

  toggleOption() {
    const { taskId, isImportant } = this.state;
    changeImportantState({
      taskId,
      toImportantState: !isImportant,
    });
    this.setState({
      isImportant: !isImportant,
    });
  }

  deleteTask() {
    const { taskId } = this.state;
    deleteTask({ taskId });
    this.setState({ isDeleteModalVisible: false });
    this.props.navigation.push('Task');
  }

  changeTitle(val) {
    this.setState({
      title: val,
    });
  }

  changeContent(val) {
    this.setState({
      content: val,
    });
  }

  render() {
    return (
      <>
        <CommonContainer navigation={this.props.navigation} title="TaskData">
          <View style={{ height: 20 }} />
          <NormalButton onPressAction={() => this.toggleCheck()} style={{ margin: 4 }}>
            {this.state.isChecked
              ? (
                <Text>
                  <Icon name="check-square" size={20} />
                  <Text>  </Text>
                  実行済
                </Text>
              ) : (
                <Text>
                  <Icon name="square" size={20} />
                  <Text>  </Text>
                  未実行
                </Text>
              )}
          </NormalButton>
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
          <Text style={styles.titleText}>
            タイトル
            {this.state.titleUpdateMessage}
          </Text>
          <TextInput
            style={{
              height: 40,
              color: '#fff',
              borderColor: '#fff',
              borderWidth: 1,
              margin: 4,
            }}
            defaultValue={this.state.title}
            onChangeText={(val) => this.changeTitle(val)}
          />
          <Text style={styles.titleText}>
            内容
            {this.state.contentUpdateMessage}
          </Text>
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
            defaultValue={this.state.content}
            onChangeText={(val) => this.changeContent(val)}
          />

          <NormalButton onPressAction={() => this.openDeleteModal()} style={{ marginTop: 30 }}>
            削除する
          </NormalButton>
          <NormalButton onPressAction={() => this.props.navigation.push('Task')} style={{ marginTop: 30 }}>
            戻る
          </NormalButton>
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
                  onPressAction={() => this.closeModal()}
                >
                  いいえ
                </NormalButton>
              </View>
            </View>
          </Modal>
          <Modal isVisible={this.state.isDeleteModalVisible}>
            <View style={{ height: 150 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
              >
                <Text>このタスクを削除しますか？</Text>
                <NormalButton
                  style={styles.modalButton}
                  onPressAction={() => this.deleteTask()}
                >
                  はい
                </NormalButton>
                <NormalButton
                  style={styles.modalButton}
                  onPressAction={() => this.closeDeleteModal()}
                >
                  いいえ
                </NormalButton>
              </View>
            </View>
          </Modal>
          <Modal isVisible={this.state.isEndUpdateModalVisible}>
            <View style={{ height: 150 }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
              >
                <Text>更新しました</Text>
              </View>
            </View>
          </Modal>
        </CommonContainer>
        <View
          style={{
            position: 'absolute',
            top: 42,
            left: Dimensions.get('window').width - 50,
            zIndex: 120,
          }}
        >
          <TouchableOpacity onPress={() => this.updateContent()}>
            <Text>更新</Text>
          </TouchableOpacity>
        </View>
      </>
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
  titleText: {
    color: '#fff',
  },
  modalButton: {
    marginTop: 10,
    width: '98%',
  },
});
