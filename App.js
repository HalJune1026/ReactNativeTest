import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/homeScreen';
import CreateTaskScreen from './screens/createTaskScreen';
import TaskDataScreen from './screens/taskDataScreen';
import TaskScreen from './screens/taskScreen';
import ScheduleScreen from './screens/scheduleScreen';
import ScheduleDataScreen from './screens/scheduleDataScreen';
import ScheduleDataOneScreen from './screens/scheduleDataOneScreen';
import CreateScheduleScreen from './screens/createScheduleScreen';
import ConfigScreen from './screens/configScreen';
import GarbageScreen from './screens/garbageScreen';

const Stack = createStackNavigator();

const screens = [
  { name: 'Home', screen: HomeScreen },
  { name: 'Schedule', screen: ScheduleScreen },
  { name: 'Task', screen: TaskScreen },
  { name: 'CreateTask', screen: CreateTaskScreen },
  { name: 'CreateSchedule', screen: CreateScheduleScreen },
  { name: 'Config', screen: ConfigScreen },
  { name: 'Garbage', screen: GarbageScreen },
  { name: 'ScheduleDataOne', screen: ScheduleDataOneScreen },
  { name: 'ScheduleData', screen: ScheduleDataScreen },
  { name: 'TaskData', screen: TaskDataScreen },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {screens.map((item) => (
          <Stack.Screen
            key={item.name}
            name={item.name}
            component={item.screen}
            options={{
              headerShown: false,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
