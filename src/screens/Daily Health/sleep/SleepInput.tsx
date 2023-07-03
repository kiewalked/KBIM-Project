import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Input, Select, Button} from 'native-base';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AccordionItem from '../../../components/AccordionItem';
import { Routes } from '../../../Routes';
import { StackScreenProps } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { addSleep } from '../../../redux/dateSlice';

type Props = StackScreenProps<Routes, 'SleepInput'>;

const SleepInputScreen = ( { route, navigation }:Props) => {
    const { date } = route.params
    const [ sleepQuality, setSleepQuality ] = useState('');
    const [ sleepMinutes, setSleepMinutes ] = useState(0);
    const sleep = useSelector(state => state.dailyHealth.history[date].sleep);
    const dispatch = useDispatch();

    const onSave = () => {
        console.log(sleepQuality, sleepMinutes);
        
        const sleepObj = {
            time: sleepMinutes,
            quality: sleepQuality,
        }
        dispatch(addSleep(date, sleepObj));
        navigation.navigate("Sleep", { date });
    }

    return (
      //<View>
        <VStack marginTop={10} alignItems={'center'} space={10}>
            <Text>Time spent sleeping</Text>
            <Input size='md' placeholder='Enter hours spent sleeping' onChangeText={(value) => {setSleepMinutes(Number(value));}}></Input>
            <Text>Quality</Text>
            <Select 
                selectedValue={sleepQuality} 
                minWidth="100%" 
                accessibilityLabel="Choose sleep quality" 
                placeholder="Choose sleep quality" 
                onValueChange={ (itemValue) => setSleepQuality(itemValue)}>
                <Select.Item label="Poor" value="poor" />
                <Select.Item label="Decent" value="Decent" />
                <Select.Item label="Good" value="Good" />
            </Select>
            <Button onPress={onSave}>Save</Button>
        </VStack>
      // </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    // paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});


export default SleepInputScreen;