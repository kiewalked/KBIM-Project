import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button, Select, HStack, Heading, Stack, Input, Pressable, TextArea, Slider} from 'native-base';
import notifee from '@notifee/react-native'
import Item from '../../components/Item';
import ButtonItem from '../../components/ButtonItem';
import { ScrollView } from 'react-native';
import Card from './Card';
import { useRef, useState } from 'react';
import Selectable from './Selectable'
import { useSelector, useDispatch } from 'react-redux';


/*
Goals screen should be an area where we define requirements for exercise, sleep & diet
Exercise requirement examples: minutes exercised
Sleep requirement: hours slept
Diet requirement: meals consumed, alcoholic beverages consumed
Smoking requirements: number of cigarettes
*/

import { Routes } from '../../Routes';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addGoal, addMiscGoal /*addExerciseGoal, addSleepGoal, addDietGoal*/ } from '../../redux/goalSlice';

type Props = StackScreenProps<Routes, 'GoalAddition'>;

const GoalAdditionScreen = ( { route, navigation }:Props) => {
    const goals = useSelector((state) => state.goal.goals.exercise)
    console.log(goals)
    const [ category, setCategory ] = useState("")
    const [ exerciseType, setExerciseType ] = useState("")
    const [ goalTime, setGoalTime ] = useState(1)
    const dispatch = useDispatch();
    const [selectedFrequency, setSelectedFrequency] = useState(0)
    const [frequencyNum, setFrequencyNum] = useState(1)
    const [dayArray, setDayArray] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ])

    const handleCallback = (newArr: Array<boolean>) => {
        setDayArray(newArr)
    }

    const [description, setDescription] = useState("")

    const saveGoal = () => {
        let frequency = ""
        let daily = false
        if (selectedFrequency === 0) {
            daily = true
            frequency = "daily"
        } else if (selectedFrequency === 1) {
            frequency = "weekly"
        } else {
            frequency = "monthly"
        }
        let categoryObj = {}
        switch (category) {
            case "exercise":
                categoryObj = {
                    kind: "exercise",
                    intensity: exerciseType,
                    measurement: "minutes"
                }
                daily ? dispatch(addGoal(frequency, dayArray, null, goalTime, category, categoryObj, description)) : dispatch(addGoal(frequency, null, frequencyNum, goalTime, category, categoryObj, description))
                break;
            case "sleep":
                categoryObj = {
                    kind: "sleep",
                    measurement: "hours"
                }
                daily ? dispatch(addGoal(frequency, dayArray, null, goalTime, category, categoryObj, description)) : dispatch(addGoal(frequency, null, frequencyNum, goalTime, category, categoryObj, description))
                break;
            case "diet":
                categoryObj = {
                    kind: "diet",
                    measurement: "meals"
                }
                daily ? dispatch(addGoal(frequency, dayArray, null, goalTime, category, categoryObj, description)) : dispatch(addGoal(frequency, null, frequencyNum, goalTime, category, categoryObj, description))
                break
            case "misc":
                dispatch(addMiscGoal(description))
                break
            default:
                break
        }
        navigation.goBack()
    }

    return (
        <VStack marginTop={10} alignItems={'center'} space={5}>
            {/* <Box></Box> */}
            <Select
                selectedValue={category}
                accessibilityLabel="Choose Category" 
                placeholder="Choose Category" 
                minWidth="50%"
                onValueChange={ (itemValue) => setCategory(itemValue)}>
                <Select.Item label="Exercise" value="exercise" />
                <Select.Item label="Sleep" value="sleep" />
                <Select.Item label="Diet" value="diet" />
                <Select.Item label="Miscellaneous" value="misc" />
            </Select>
            { (category === "exercise" || category === "sleep" || category === "diet") && 
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
                            Frequency
                        </Heading>
                        <VStack></VStack>
                        <HStack space={2} justifyContent="center">
                            <Pressable flex={1} onPress={() => setSelectedFrequency(0)}>
                                <Box rounded="lg" backgroundColor={selectedFrequency == 0 ? "orange.400" : "gray.50"}>
                                    <Text textAlign="center" color={selectedFrequency == 0 ? "white" : "black"}>Daily</Text>
                                </Box>
                            </Pressable>
                            <Pressable flex={1} onPress={() => setSelectedFrequency(1)}>
                                <Box rounded="lg" backgroundColor={selectedFrequency == 1 ? "orange.400" : "gray.50"}>
                                    <Text textAlign="center" color={selectedFrequency == 1 ? "white" : "black"}>Weekly</Text>
                                </Box>
                            </Pressable>
                            <Pressable flex={1} onPress={() => setSelectedFrequency(2)}>
                                <Box rounded="lg" backgroundColor={selectedFrequency == 2 ? "orange.400" : "gray.50"}>
                                    <Text textAlign="center" color={selectedFrequency == 2 ? "white" : "black"}>Monthly</Text>
                                </Box>
                            </Pressable>
                        </HStack>
                        <Heading size="md" ml="-1" mb="-2">
                            Pick Frequency
                        </Heading>
                        {selectedFrequency === 0 &&
                            <VStack space={2}>
                                <HStack space={2} justifyContent="center">
                                    <Selectable text="Sun" dayArray={dayArray} handleCallback={handleCallback} dayNum = {0}></Selectable>
                                    <Selectable text="Mon" dayArray={dayArray} handleCallback={handleCallback} dayNum = {1}></Selectable>
                                    <Selectable text="Tue" dayArray={dayArray} handleCallback={handleCallback} dayNum = {2}></Selectable>
                                    <Selectable text="Wed" dayArray={dayArray} handleCallback={handleCallback} dayNum = {3}></Selectable>
                                </HStack>
                                <HStack space={2} justifyContent="center">
                                    <Selectable text="Thu" dayArray={dayArray} handleCallback={handleCallback} dayNum = {4}></Selectable>
                                    <Selectable text="Fri" dayArray={dayArray} handleCallback={handleCallback} dayNum = {5}></Selectable>
                                    <Selectable text="Sat" dayArray={dayArray} handleCallback={handleCallback} dayNum = {6}></Selectable>
                                </HStack>
                            </VStack>
                        }
                        {selectedFrequency === 1  && 
                            <VStack space={2} alignItems='center'>
                                <Text>Every {frequencyNum} weeks</Text>
                                <Slider w="3/4" maxW="300" defaultValue={frequencyNum} minValue={1} maxValue={10} accessibilityLabel="hello world" step={1} onChange={(value) => {setFrequencyNum(value)}}>
                                    <Slider.Track>
                                    <Slider.FilledTrack />
                                    </Slider.Track>
                                    <Slider.Thumb />
                                </Slider>
                            </VStack>
                        }
                        {selectedFrequency === 2  && 
                            <VStack space={2} alignItems='center'>
                                <Text>Every {frequencyNum} months</Text>
                                <Slider w="3/4" maxW="300" defaultValue={frequencyNum} minValue={1} maxValue={10} accessibilityLabel="hello world" step={1} onChange={(value) => {setFrequencyNum(value)}}>
                                    <Slider.Track>
                                    <Slider.FilledTrack />
                                    </Slider.Track>
                                    <Slider.Thumb />
                                </Slider>
                            </VStack>
                        }
    
                    </Stack>
                </Box>
            </Box>    
            }
            { category === "exercise" && 
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
                                <Pressable flex={1} onPress={() => setExerciseType("light")}>
                                    <Box rounded="lg" backgroundColor={exerciseType == "light" ? "orange.400" : "gray.50"}>
                                        <Text textAlign="center" color={exerciseType == "light" ? "white" : "black"}>Light</Text>
                                    </Box>
                                </Pressable>
                                <Pressable flex={1} onPress={() => setExerciseType("moderate")}>
                                    <Box rounded="lg" backgroundColor={exerciseType == "moderate" ? "orange.400" : "gray.50"}>
                                        <Text textAlign="center" color={exerciseType == "moderate" ? "white" : "black"}>Moderate</Text>
                                    </Box>
                                </Pressable>
                                <Pressable flex={1} onPress={() => setExerciseType("vigorous")}>
                                    <Box rounded="lg" backgroundColor={exerciseType == "vigorous" ? "orange.400" : "gray.50"}>
                                        <Text textAlign="center" color={exerciseType == "vigorous" ? "white" : "black"}>Vigorous</Text>
                                    </Box>
                                </Pressable>
                            </HStack>
                            <Heading size="md" ml="-1" mb="-2">
                                Goal Time
                            </Heading>
                            <VStack alignItems='center'>
                                <Text>You have selected {goalTime} minutes</Text>
                                <Slider w="3/4" maxW="300" defaultValue={1} minValue={1} maxValue={120} accessibilityLabel="hello world" step={1} onChange={(value) => {setGoalTime(value)}}>
                                    <Slider.Track>
                                    <Slider.FilledTrack />
                                    </Slider.Track>
                                    <Slider.Thumb />
                                </Slider>
                            </VStack>
                            <Heading size="md" ml="-1" mb="-1">
                                Description
                            </Heading>
                            <TextArea placeholder='Describe your goal' autoCompleteType={true} onChangeText={(value) => {setDescription(value)}}></TextArea>
                        </Stack>
                    </Box>
                </Box>    
            }
            { category === "sleep" && 
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
                                Goal Time
                            </Heading>
                            <VStack alignItems='center'>
                                <Text>You have selected {goalTime} minutes</Text>
                                <Slider w="3/4" maxW="300" defaultValue={1} minValue={1} maxValue={120} accessibilityLabel="hello world" step={1} onChange={(value) => {setGoalTime(value)}}>
                                    <Slider.Track>
                                    <Slider.FilledTrack />
                                    </Slider.Track>
                                    <Slider.Thumb />
                                </Slider>
                            </VStack>
                            <Heading size="md" ml="-1" mb="-1">
                                Description
                            </Heading>
                            <TextArea placeholder='Describe your goal' autoCompleteType={true} onChangeText={(value) => {setDescription(value)}}></TextArea>
                        </Stack>
                    </Box>
                </Box>    
            }
            { category === "diet" && 
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
                            <Heading size="md" ml="-1" mb="-1">
                                Goal Meals
                            </Heading>
                            <VStack alignItems='center'>
                                <Text>You have selected {goalTime} meals</Text>
                                <Slider w="3/4" maxW="300" defaultValue={1} minValue={1} maxValue={5} accessibilityLabel="hello world" step={1} onChange={(value) => {setGoalTime(value)}}>
                                    <Slider.Track>
                                    <Slider.FilledTrack />
                                    </Slider.Track>
                                    <Slider.Thumb />
                                </Slider>
                            </VStack>
                            <Heading size="md" ml="-1" mb="-1">
                                Description
                            </Heading>
                            <TextArea placeholder='Describe your goal' autoCompleteType={true} onChangeText={(value) => {setDescription(value)}}></TextArea>
                        </Stack>
                    </Box>
                </Box>    
            }

            { category === "misc" && 
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
                            <Heading size="md" ml="0" mb="-2">
                                Goal
                            </Heading>
                            <TextArea placeholder='Describe your goal' autoCompleteType={true} onChangeText={(value) => {setDescription(value)}}></TextArea>
                        </Stack>
                    </Box>
                </Box>    
            }
            <Button onPress={saveGoal}>Save</Button>
        </VStack>
    );
}

export default GoalAdditionScreen;