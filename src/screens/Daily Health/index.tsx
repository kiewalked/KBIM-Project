import React, { useEffect } from 'react';

import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button} from 'native-base';

import {StyleSheet} from 'react-native';

import Footer from '../../components/Footer';
import Content from '../../../content';
import Item from '../../components/Item';

import type { StackScreenProps } from '@react-navigation/stack';
import { Routes } from '../../Routes';
import { useDispatch, useSelector } from 'react-redux';
import { verifyDateExists } from '../../redux/dateSlice';


type Props = StackScreenProps<Routes, 'DailyHealth'>;

const DailyHealthScreen = ( { route, navigation }: Props ) => {
  const date = route.params.date;
  const debug = useSelector(state => state.dailyHealth.history);
  const dispatch = useDispatch();
  const loadDate = (date) => {
    dispatch(verifyDateExists(date));
  }
  useEffect(
    () => { loadDate(date) },
    [ loadDate, date ]
  );
  return (
    <View>
      <VStack marginTop={10} alignItems={'center'} space={10}>
        <Item icon='foot' status={true} statusColor='red' route='PhysicalActivity' date={date}>
          <Text>Physical Activity</Text>
        </Item>
        <Item status={true} statusColor='lime' route='Sleep' date={date}>
          <Text>Sleep</Text>
        </Item>
        <Item status={true} statusColor='orange' route='Diet' date={date}>
          <Text>Diet</Text>
        </Item>
        {/* <Button onPress={() => {
          console.log("debug: ", debug);
          console.log("debug2: ", debug[date].exercises);
        }}>
        Print Debug
        </Button> */}
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DailyHealthScreen;
