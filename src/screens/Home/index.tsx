import React from 'react';

import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button} from 'native-base';

import {StyleSheet} from 'react-native';

import Footer from '../../components/Footer';
import Content from '../../../content';
import Item from '../../components/Item';

import type { StackScreenProps } from '@react-navigation/stack';
import { Routes } from '../../Routes';
import notifee from '@notifee/react-native'

type Props = StackScreenProps<Routes, 'Home'>;

const HomeScreen = ( { route, navigation }: Props ) => {
  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const todayStr = yyyy + '-' + mm + '-' + dd;
    return todayStr;
  }

  const onLaunch = async () => {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });
  }
  
  onLaunch();
  
  return (
      <VStack marginTop={10} alignItems={'center'} space={10}>
        <Item icon='heart' iconColor='#ff78ae' status={true} statusColor='red' route='DailyHealth' date={getDate()}>
          <Text>Daily Health</Text>
        </Item>
        <Item icon='target' iconColor='#FF0000' route='Goals'>
          <Text>Goals</Text>
        </Item>
        <Item icon='list-thumbnails' route='History' date={getDate()}>
          <Text>History</Text>
        </Item>
        <Item icon='graph-bar' route='Statistics'>
          <Text>Statistics</Text>
        </Item>
        {/* <Button onPress={getDate}>Test Button</Button> */}
      </VStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
