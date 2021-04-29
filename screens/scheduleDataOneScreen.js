import React, { PureComponent } from 'react';
import {
  View, StyleSheet, Text, TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import { getScheduleDataById, updateScheduleDataById, deleteScheduleDataById } from '../repository/scheduleRepository';
import CommonContainer from '../components/commonContainer';
import NormalButton from '../components/normalButton';

export default class TaskScreen extends PureComponent {
  constructor(props) {
    super(props);
    let scheId = 0;
    if (this.props.route.params !== undefined && this.props.route.params.scheId !== undefined) {
      scheId = this.props.route.params.scheId;
    } else {
      this.props.navigation.push('Home');
    }
    this.state = {
      scheId,
      targetDate: null,
      isModalVisible: false,
      content: null,
      isEndUpdateModalVisible: false,
    };
  }

  componentDidMount() {
    getScheduleDataById({ scheId: this.state.scheId })
      .then((res) => {
        this.setState({
          targetDate: res[0].sche_date,
          content: res[0].content,
        });
      });
  }

  updateSchedule() {
    updateScheduleDataById({
      scheId: this.state.scheId,
      content: this.state.content,
    });
    this.setState({ isEndUpdateModalVisible: true });
    setTimeout(() => this.setState({ isEndUpdateModalVisible: false }), 750);
  }

  deleteScheduleData() {
    deleteScheduleDataById({ scheId: this.state.scheId });
    this.closeModal();
    this.props.navigation.push('Schedule');
  }

  openModal() {
    this.setState({ isModalVisible: true });
  }

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  changeContent(val) {
    this.setState({
      content: val,
    });
  }

  render() {
    const { targetDate } = this.state;

    return (
      <CommonContainer navigation={this.props.navigation} title={targetDate}>
        <NormalButton onPressAction={() => this.updateSchedule()} style={{ marginTop: 15 }}>
          更新する
        </NormalButton>
        <View style={{ height: 30 }} />
        <Text style={styles.titleText}>内容</Text>
        <TextInput
          defaultValue={this.state.content}
          style={{
            height: 40,
            color: '#fff',
            borderColor: '#fff',
            borderWidth: 1,
            margin: 4,
          }}
          onChangeText={(val) => this.changeContent(val)}
        />
        <NormalButton onPressAction={() => this.openModal()} style={{ marginTop: 30 }}>
          削除する
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
              <Text>このスケジュールデータを</Text>
              <Text>削除しますか？</Text>
              <NormalButton
                style={styles.modalButton}
                onPressAction={() => this.deleteScheduleData()}
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
