import React from 'react';

import {
  Container,
  NativeBaseProvider,
  Box,
  VStack,
  Center,
  View,
  Text,
  Flex,
  Button,
  HStack,
} from 'native-base';

import {StyleSheet} from 'react-native';

import Footer from '../../components/Footer';
import Content from '../../../content';
import Item from '../../components/Item';

import type {StackScreenProps} from '@react-navigation/stack';
import {Routes} from '../../Routes';
import notifee from '@notifee/react-native';
import {useSelector, useDispatch} from 'react-redux';
import * as types from '../types';
import {verifyDateExists} from '../../redux/dateSlice';

type Props = StackScreenProps<Routes, 'Home'>;

const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  const todayStr = yyyy + '-' + mm + '-' + dd;
  return todayStr;
};

const verifyGoal = (goal: types.Goal, dailyHealthData) => {
  console.log('====INSIDE VERIFY GOAL====');
  console.log('goal:', goal);
  const todayDate = getDate();
  console.log('dailyHealthData: ', dailyHealthData);
  let totalTime = 0;
  const categoryObj = goal['categoryObj'];
  console.log('categoryObj.kind', categoryObj.kind);
  switch (categoryObj.kind) {
    case 'exercise':
      dailyHealthData['exercises'].forEach(element => {
        console.log('element[intensity]', element['intensity']);
        console.log('categoryObj[intensity]', categoryObj['intensity']);
        if (element['intensity'] == categoryObj['intensity']) {
          totalTime += element['time'];
        }
      });
      console.log('====EXITING VERIFY GOAL1====');
      if (totalTime >= goal.quantity) return true;
      break;
    case 'sleep':
      if (dailyHealthData['sleep'] >= goal.quantity) return true;
      break;
    case 'diet':
      switch (goal.categoryObj.measurement) {
        case 'meals':
          if (dailyHealthData['diet'].length >= goal.quantity) return true;
          break;
        case 'alcohol':
          if (dailyHealthData['alcohol']['standards'] >= goal.quantity)
            return true;
          break;
        case 'water':
          if (dailyHealthData['water'] >= goal.quantity) return true;
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
  console.log('====EXITING VERIFY GOAL2====');
  return false;
};

const HomeScreen = ({route, navigation}: Props) => {
  const date = getDate();
  const dispatch = useDispatch();
  dispatch(verifyDateExists(date));
  const goals = useSelector(state => state.goal.goals);
  const onLaunch = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  };

  const dailyHealthData = useSelector(state => state.dailyHealth.history[date]);

  goals.forEach(element => {
    console.log(
      element.category,
      'goal verified:',
      verifyGoal(element, dailyHealthData),
    );
  });

  onLaunch();

  return (
    <VStack marginTop={10} alignItems={'center'} space={10}>
      <Text
        fontFamily="body"
        fontWeight="100"
        fontStyle="regular"
        fontSize="3xl"
        mt="-3"
        mb="-3">
        Welcome Harry!
      </Text>
      <Item
        icon="heart"
        iconColor="#ff78ae"
        status={true}
        statusColor="red"
        route="DailyHealth"
        date={getDate()}>
        <Text>Daily Health</Text>
      </Item>
      <Item icon="target" iconColor="#FF0000" route="Goals">
        <Text>Goals</Text>
      </Item>
      <Item icon="list-thumbnails" route="History" date={getDate()}>
        <Text>History</Text>
      </Item>
      {/* <Item icon='graph-bar' route='Statistics'>
          <Text>Statistics</Text>
        </Item> */}
      {/* <Button onPress={getDate}>Test Button</Button> */}
      <HStack space={2}>
        <Button>Add water glass</Button>
        <Button>Add beer</Button>
      </HStack>
    </VStack>
  );
};

export default HomeScreen;
