import React, { PureComponent } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  LayoutAnimation,
  Pressable,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  NativeModules,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import { Divider } from 'react-native-elements';

const { UIManager } = NativeModules;
if (
  Platform.OS === 'android'
  && UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class CommonContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowDrawer: false,
      drawerLeft: -250,
    };
  }

  hideDrawer(e) {
    const { isShowDrawer } = this.state;
    if (!isShowDrawer) {
      return;
    }

    if (e.nativeEvent.locationX < 250) {
      return;
    }

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isShowDrawer: false,
      drawerLeft: -250,
    });
  }

  toggleDrawer() {
    const { isShowDrawer } = this.state;

    const drawerLeft = isShowDrawer ? -250 : 0;

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      isShowDrawer: !isShowDrawer,
      drawerLeft,
    });
  }

  selectLink(link) {
    const { navigation } = this.props;
    this.setState({
      isShowDrawer: false,
      drawerLeft: -250,
    });
    navigation.push(link);
  }

  render() {
    const LinkList = [
      { name: 'ホーム', link: 'Home' },
      { name: 'タスク', link: 'Task' },
      { name: 'スケジュール', link: 'Schedule' },
      // { name: 'ルーチン', link: 'Routin' },
      // { name: 'ノート', link: 'Note' },
      { name: '設定', link: 'Config' },
      { name: 'ゴミ箱', link: 'Garbage' },
    ];

    const { isShowDrawer, drawerLeft } = this.state;
    const { title } = this.props;

    return (

      <View
        style={{
          flex: 1,
          backgroundColor: '#333',
          color: '#fff',
        }}
      >
        {isShowDrawer ? (
          <Pressable
            onPress={(e) => this.hideDrawer(e)}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height,
              backgroundColor: 'rgba( 50, 50, 50, 0.75 )',
              zIndex: 100,
            }}
          />
        ) : null }
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="bars" size={24} onPress={() => this.toggleDrawer()} style={{ paddingTop: 25, paddingLeft: 20, width: 50 }} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <View
            style={[
              styles.drawer,
              { left: drawerLeft },
            ]}
          >
            <TouchableOpacity style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
            >
              <Icon name="close" size={24} onPress={() => this.toggleDrawer()} style={{ marginVertical: 15, paddingLeft: 20, width: 50 }} />
            </TouchableOpacity>
            <Divider />

            {LinkList.map((data) => (
              <TouchableOpacity key={data.name} onPress={() => this.selectLink(data.link)}>
                <View style={styles.container}>
                  <View style={styles.item}>
                    <Text style={{
                      fontSize: 27,
                      marginLeft: 30,
                    }}
                    >
                      {data.name}
                    </Text>
                  </View>
                  <Divider />
                </View>
              </TouchableOpacity>
            ))}
          </View>

        </View>
        <View style={styles.content}>
          {this.props.children}
        </View>
        <View style={{ height: 30 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 75,
    backgroundColor: '#fff',
    paddingTop: 10,
    zIndex: 100,
    flexDirection: 'row',
  },
  title: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 24,
  },
  content: {
    zIndex: 1,
    height: Dimensions.get('window').height - 50,
  },
  drawer: {
    position: 'absolute',
    top: 25,
    width: 250,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    zIndex: 110,
  },
  container: {
    position: 'relative',
    top: 0,
    left: 0,
    marginTop: 20,
  },
  item: {
    position: 'relative',
    top: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 2,
    marginBottom: 2,
  },
});
