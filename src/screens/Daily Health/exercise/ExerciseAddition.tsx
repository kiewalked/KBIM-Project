import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button, Input, Select, CheckIcon} from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import { setCounter } from '../../../redux/actions';
import { RootState } from '../../../redux/store';
import { increment, decrement, selectCount } from '../../../redux/counterSlice';
import { useState } from 'react';
import { addExercise } from '../../../redux/dateSlice';

// First, try to implement counter state into app
// Then try to extend counter state into slices, and modify appearance

import { Routes } from '../../../Routes';
import { StackScreenProps } from '@react-navigation/stack';

type Props = StackScreenProps<Routes, 'Exercise'>;

const ExerciseAdditionScreen = ( { route, navigation }:Props) => {
    const date = route.params.date;
    const count = useSelector(selectCount);
    const exercises = useSelector((state) => state.dailyHealth.history[date].exercises);
    const dispatch = useDispatch();

    

    if (count === 'undefined') {
        console.log("ooga booga");
    }

    const onSave = () => {
        console.log(exerciseTitle, exerciseMinutes, intensity);
        
        const exerciseObj = {
            title: exerciseTitle,
            time: exerciseMinutes,
            intensity: intensity,
        }
        dispatch(addExercise(date, exerciseObj));
        navigation.navigate('PhysicalActivity', { date: date });
    }

    const [exerciseTitle, setExerciseTitle] = useState('');
    const [exerciseMinutes, setExerciseMinutes] = useState(0);
    const [intensity, setIntensity] = useState('');

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {//<Text>Exercise Addition {count}</Text>
            }
            <Text>Type of exercise</Text>
            <Input size='md' placeholder='Enter the type of exercise' onChangeText={(value) => {setExerciseTitle(value);}}></Input>
            <Text>Time spent exercising</Text>
            <Input size='md' placeholder='Enter minutes spent exercising' onChangeText={(value) => {setExerciseMinutes(Number(value));}}></Input>
            <Text>Intensity</Text>
            <Select 
                selectedValue={intensity} 
                minWidth="100%" 
                accessibilityLabel="Choose Intensity" 
                placeholder="Choose Intensity" 
                onValueChange={ (itemValue) => setIntensity(itemValue)}>
                <Select.Item label="Light" value="light" />
                <Select.Item label="Moderate" value="moderate" />
                <Select.Item label="Vigorous" value="vigorous" />
            </Select>            
            <Button onPress={onSave}>Save</Button>
            {
            /*
            <Button onPress={() => dispatch(increment())}>
                <Text>Increment me!</Text>
            </Button>
            <Button onPress={() => dispatch(decrement())}>
                <Text>Decrement me!</Text>
            </Button>
            */
            }
        </View>
    );
}

export default ExerciseAdditionScreen;