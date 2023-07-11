import React, { useEffect, useState } from 'react';

import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button, Slider} from 'native-base';

import {ScrollView, StyleSheet} from 'react-native';

import Footer from '../../components/Footer';
import Content from '../../../content';
import Item from '../../components/Item';

import type { StackScreenProps } from '@react-navigation/stack';
import { Routes } from '../../Routes';
import { useDispatch, useSelector } from 'react-redux';
import { verifyDateExists } from '../../redux/dateSlice';
import ButtonItem from '../../components/ButtonItem';


type Props = StackScreenProps<Routes, 'DailyHealth'>;

const DailyHealthScreen = ( { route, navigation }: Props ) => {
  const [ sleepHours, setSleepHours ] = useState(0)
  const [ cigarettesSmoked, setCigarettesSmoked ] = useState(0)
  const [ alcoholConsumed, setAlcoholConsumed ] = useState(0)
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

  const sleepSlider = 
  <VStack alignItems="center" space={2}>
    <Slider w="3/4" maxW="300" defaultValue={sleepHours} minValue={0} maxValue={16} accessibilityLabel="hello world" step={1} onChange={(value) => {setSleepHours(value)}}>
      <Slider.Track bg="gray.300">
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
    <Text style={styles.text}>You slept for {sleepHours} hours today</Text>
    <Button>Save</Button>
  </VStack>

  const smokingSlider = 
  <VStack alignItems="center" space={2}>
    <Slider w="3/4" maxW="300" defaultValue={cigarettesSmoked} minValue={0} maxValue={16} accessibilityLabel="hello world" step={1} onChange={(value) => {setCigarettesSmoked(value)}}>
      <Slider.Track bg="gray.300">
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
    <Text style={styles.text}>You have smoked {cigarettesSmoked} cigarettes today</Text>
    <Button>Save</Button>
  </VStack>

  const alcoholSlider = 
  <VStack alignItems="center" space={2}>
    <Slider w="3/4" maxW="300" defaultValue={alcoholConsumed} minValue={0} maxValue={16} accessibilityLabel="hello world" step={1} onChange={(value) => {setAlcoholConsumed(value)}}>
      <Slider.Track bg="gray.300">
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
    <Text style={styles.text}>You have consumed {alcoholConsumed} standards today</Text>
    <Button>Save</Button>
  </VStack>


  return (
    <ScrollView>
      <VStack marginTop={10} alignItems={'center'} space={10} marginBottom={10}>
        <Item icon='foot' status={true} statusColor='red' route='PhysicalActivity' date={date}>
          <Text>Physical Activity</Text>
        </Item>
        <Item status={true} statusColor='orange' route='Diet' date={date}>
          <Text>Diet</Text>
        </Item>
        <ButtonItem title="Sleep" interiorContent={sleepSlider}></ButtonItem>
        <ButtonItem title="Smoking" interiorContent={smokingSlider}></ButtonItem>
        <ButtonItem title="Alcohol" interiorContent={alcoholSlider}></ButtonItem>
        {/* <Button onPress={() => {
          console.log("debug: ", debug);
          console.log("debug2: ", debug[date].exercises);
        }}>
        Print Debug
        </Button> */}
      </VStack>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16
  }
});

export default DailyHealthScreen;
