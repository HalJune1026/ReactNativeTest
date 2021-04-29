import React, { PureComponent } from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import Modal from 'react-native-modal';
import init from '../repository/init';
import CommonContainer from '../components/commonContainer';
import NormalButton from '../components/normalButton';
import OneLineInput from '../components/oneLineInput';

export default class TaskScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initText: null,
      isInitModalVisible: false,
      isEndInitModalVisible: false,
    };
  }

  onChangeInit(val) {
    this.setState({
      initText: val,
    });
  }

  initData() {
    const { initText } = this.state;
    if (initText === 'init') {
      init();
    }
    this.setState({ isEndInitModalVisible: true });
    this.hideInitModal();

    setTimeout(() => this.setState({ isEndInitModalVisible: false }), 750);
  }

  openInitModal() {
    this.setState({ isInitModalVisible: true });
  }

  hideInitModal() {
    this.setState({ isInitModalVisible: false });
  }

  render() {
    return (
      <CommonContainer navigation={this.props.navigation} title="Config">
        <NormalButton onPressAction={() => this.openInitModal()} style={{ marginTop: 30 }}>
          データを初期化する
        </NormalButton>

        <Modal isVisible={this.state.isInitModalVisible}>
          <View style={{ height: 200 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Text>初期化を行う場合</Text>
              <Text>initと入力し、ボタンをタッチしてください。</Text>
              <OneLineInput
                isBlack
                isNotEnd
                placeholder="init"
                onChangeText={(val) => this.onChangeInit(val)}
              />
              <NormalButton
                style={styles.modalButton}
                onPressAction={() => this.initData()}
              >
                データを初期化する
              </NormalButton>
              <NormalButton
                style={styles.modalButton}
                onPressAction={() => this.hideInitModal()}
              >
                閉じる
              </NormalButton>
              <View style={{ height: 15 }} />
            </View>
          </View>
        </Modal>
        <Modal isVisible={this.state.isEndInitModalVisible}>
          <View style={{ height: 150 }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
              }}
            >
              <Text>データを初期化しました</Text>
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
