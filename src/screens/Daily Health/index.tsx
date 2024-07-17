import React, { useEffect, useMemo, useState } from 'react';

import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button, Slider, HStack, Pressable} from 'native-base';

import {ScrollView, StyleSheet} from 'react-native';

import Footer from '../../components/Footer';
import Content from '../../../content';
import Item from '../../components/Item';

import type { StackScreenProps } from '@react-navigation/stack';
import { Routes } from '../../Routes';
import { useDispatch, useSelector } from 'react-redux';
import { verifyDateExists, addSleep, addAlcohol, addSmoking } from '../../redux/dateSlice';
import ButtonItem from '../../components/ButtonItem';

type Props = StackScreenProps<Routes, 'DailyHealth'>;

const DailyHealthScreen = ( { route, navigation }: Props ) => {
  
  const [ sleepQuality, setSleepQuality ] = useState('')
  const [ sleepHours, setSleepHours ] = useState(0)
  const [ cigarettesSmoked, setCigarettesSmoked ] = useState(0)
  const [ vapesSmoked, setVapesSmoked ] = useState(0)
  const [ alcoholConsumed, setAlcoholConsumed ] = useState(0)
  
  const date = route.params.date;

  const dispatch = useDispatch();
  dispatch(verifyDateExists(date))
  // const loadDate = (date) => {
  //   dispatch(verifyDateExists(date));
  // }
  // useEffect(
  //   () => { 
  //     dispatch(verifyDateExists(date));
  //   },
  //   [ dispatch, verifyDateExists, date ]
  // );

  const dailyHealthData = useSelector(state => state.dailyHealth.history[date])

  useMemo(
    () => {
      if (dailyHealthData === undefined) {return}
      const sleepData = dailyHealthData["sleep"]
      const smokingData = dailyHealthData["smoking"]
      const alcoholData = dailyHealthData["alcohol"]
      setSleepHours(sleepData["time"])
      setSleepQuality(sleepData["quality"])
      setCigarettesSmoked(smokingData["regular"])
      setVapesSmoked(smokingData["vape"])
      setAlcoholConsumed(alcoholData["standards"])    
    },
    [dailyHealthData]
  );



  const saveSmoking = () => {
    const smokingObj = {
      "regular": cigarettesSmoked,
      "vape": vapesSmoked
    }
    dispatch(addSmoking(date, smokingObj))
  }
  // try {
  //   const sleepData = dailyHealthData["sleep"]
  // }
  // catch (e) {
  //   console.log("dailyHealthData inside: ", dailyHealthData)
  //   console.log(e)
  // // }
  // useEffect(
  //   () => { setSleepHours(sleepData["time"]) },
  //   [ setSleepHours, sleepData ]
  // );

  // console.log(sleepData)
  // console.log(dailyHealthData)

  const sleepSlider = 
  <VStack alignItems="center" space={4}>
    <Slider w="3/4" maxW="300" defaultValue={sleepHours} minValue={0} maxValue={16} accessibilityLabel="hello world" step={1} onChange={(value) => {setSleepHours(value)}}>
      <Slider.Track bg="gray.300">
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
    <Text>You slept for {sleepHours} hours today</Text>
    <HStack space={2} justifyContent="center">
      <Pressable flex={1} onPress={() => setSleepQuality("poor")}>
          <Box rounded="lg" backgroundColor={sleepQuality == "poor" ? "orange.400" : "gray.50"}>
              <Text textAlign="center" color={sleepQuality == "poor" ? "white" : "black"}>Poor</Text>
          </Box>
      </Pressable>
      <Pressable flex={1} onPress={() => setSleepQuality("okay")}>
          <Box rounded="lg" backgroundColor={sleepQuality == "okay" ? "orange.400" : "gray.50"}>
              <Text textAlign="center" color={sleepQuality == "okay" ? "white" : "black"}>Okay</Text>
          </Box>
      </Pressable>
      <Pressable flex={1} onPress={() => setSleepQuality("Great")}>
          <Box rounded="lg" backgroundColor={sleepQuality == "Great" ? "orange.400" : "gray.50"}>
              <Text textAlign="center" color={sleepQuality == "Great" ? "white" : "black"}>Great</Text>
          </Box>
      </Pressable>
    </HStack>
    <Button onPress={() => {
      const sleepObj = {
        "time": sleepHours,
        "quality": sleepQuality
      }
      dispatch(addSleep(date, sleepObj))
    }}>
      Save
    </Button>
  </VStack>

  const smokingSlider = 
  <VStack alignItems="center" space={2}>
    <Slider w="3/4" maxW="300" defaultValue={cigarettesSmoked} minValue={0} maxValue={16} accessibilityLabel="hello world" step={1} onChange={(value) => {setCigarettesSmoked(value)}}>
      <Slider.Track bg="gray.300">
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
    <Text>You have smoked {cigarettesSmoked} cigarettes today</Text>
    <Slider w="3/4" maxW="300" defaultValue={vapesSmoked} minValue={0} maxValue={16} accessibilityLabel="hello world" step={1} onChange={(value) => {setVapesSmoked(value)}}>
      <Slider.Track bg="gray.300">
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
    <Text>You have puffed {vapesSmoked} vapes today</Text>
    <Button onPress={() => saveSmoking()}>Save</Button>

  </VStack>

  const alcoholSlider = 
  <VStack alignItems="center" space={2}>
    <Slider w="3/4" maxW="300" defaultValue={alcoholConsumed} minValue={0} maxValue={16} accessibilityLabel="hello world" step={1} onChange={(value) => {setAlcoholConsumed(value)}}>
      <Slider.Track bg="gray.300">
        <Slider.FilledTrack />
      </Slider.Track>
      <Slider.Thumb />
    </Slider>
    <Text>You have consumed {alcoholConsumed} standards today</Text>
    <Button onPress={() => {
      const alcoholObj = {
        "standards": alcoholConsumed
      }
      dispatch(addAlcohol(date, alcoholObj))
    }}>Save</Button>
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
