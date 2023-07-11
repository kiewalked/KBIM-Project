import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button, Input, Select, CheckIcon, Stack, Heading, Pressable, HStack, Slider, TextArea} from 'native-base';
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
    const [description, setDescription] = useState('');
    const [exerciseMinutes, setExerciseMinutes] = useState(0);
    const [intensity, setIntensity] = useState('');

    return (
        <VStack marginTop={10} alignItems={'center'} space={5}>
            <VStack alignItems="center" space={2}>
                <Select
                    selectedValue={exerciseTitle}
                    accessibilityLabel="Choose Category" 
                    placeholder="Choose Exercise Type" 
                    minWidth="50%"
                    onValueChange={ (itemValue) => setExerciseTitle(itemValue)}>
                    <Select.Item label="Walking" value="Walking" />
                    <Select.Item label="Running" value="Running" />
                    <Select.Item label="Tennis" value="Tennis" />
                    <Select.Item label="Gym" value="Gym" />
                    <Select.Item label="Other" value="Other" />
                </Select>
                { exerciseTitle === "Other" && <Input width="90%" placeholder="Enter the exercise type"></Input> }
            </VStack>
            <Box alignItems="center">
                    <Box minW="90%" maxW="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" 
                    _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.700"
                    }} _web={{
                        shadow: 2,
                        borderWidth: 0
                    }} _light={{
                        backgroundColor: "gray.50"
                    }}>
                        <Stack p="4" space={3}>
                            <Heading size="md" ml="-1" mb="-2">
                                Type of Exercise
                            </Heading>
                            <HStack space={2} justifyContent="center">
                                <Pressable flex={1} onPress={() => setIntensity("light")}>
                                    <Box rounded="lg" backgroundColor={intensity == "light" ? "orange.400" : "gray.50"}>
                                        <Text textAlign="center" color={intensity == "light" ? "white" : "black"}>Light</Text>
                                    </Box>
                                </Pressable>
                                <Pressable flex={1} onPress={() => setIntensity("moderate")}>
                                    <Box rounded="lg" backgroundColor={intensity == "moderate" ? "orange.400" : "gray.50"}>
                                        <Text textAlign="center" color={intensity == "moderate" ? "white" : "black"}>Moderate</Text>
                                    </Box>
                                </Pressable>
                                <Pressable flex={1} onPress={() => setIntensity("vigorous")}>
                                    <Box rounded="lg" backgroundColor={intensity == "vigorous" ? "orange.400" : "gray.50"}>
                                        <Text textAlign="center" color={intensity == "vigorous" ? "white" : "black"}>Vigorous</Text>
                                    </Box>
                                </Pressable>
                            </HStack>
                            <Heading size="md" ml="-1" mb="-2">
                                Time spent exercising
                            </Heading>
                            <VStack alignItems='center'>
                                <Text>You have selected {exerciseMinutes} minutes</Text>
                                <Slider w="3/4" maxW="300" defaultValue={1} minValue={1} maxValue={120} accessibilityLabel="hello world" step={1} onChange={(value) => {setExerciseMinutes(value)}}>
                                    <Slider.Track>
                                    <Slider.FilledTrack />
                                    </Slider.Track>
                                    <Slider.Thumb />
                                </Slider>
                            </VStack>
                            <Heading size="md" ml="-1" mb="-1">
                                Notes
                            </Heading>
                            <TextArea placeholder='Describe the activity' autoCompleteType={true} onChangeText={(value) => {setDescription(value)}}></TextArea>
                        </Stack>
                    </Box>
                </Box>
                <Button onPress={onSave}>Save</Button> 
        </VStack>
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text>Type of exercise</Text>
        //     <Input size='md' placeholder='Enter the type of exercise' onChangeText={(value) => {setExerciseTitle(value);}}></Input>
        //     <Text>Time spent exercising</Text>
        //     <Input size='md' placeholder='Enter minutes spent exercising' onChangeText={(value) => {setExerciseMinutes(Number(value));}}></Input>
        //     <Text>Intensity</Text>
        //     <Select 
        //         selectedValue={intensity} 
        //         minWidth="100%" 
        //         accessibilityLabel="Choose Intensity" 
        //         placeholder="Choose Intensity" 
        //         onValueChange={ (itemValue) => setIntensity(itemValue)}>
        //         <Select.Item label="Light" value="light" />
        //         <Select.Item label="Moderate" value="moderate" />
        //         <Select.Item label="Vigorous" value="vigorous" />
        //     </Select>            
        //     <Button onPress={onSave}>Save</Button>
        // </View>
    );
}

export default ExerciseAdditionScreen;