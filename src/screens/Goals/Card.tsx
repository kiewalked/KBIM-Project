import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button, AspectRatio, HStack, Heading, Image, Stack, Pressable, Slider} from 'native-base';
import notifee from '@notifee/react-native'
import Item from '../../components/Item';
import ButtonItem from '../../components/ButtonItem';
import { useState } from 'react';
import Selectable from './Selectable';

/*
Goals screen should be an area where we define requirements for exercise, sleep & diet
Exercise requirement examples: minutes exercised
Sleep requirement: hours slept
Diet requirement: meals consumed, alcoholic beverages consumed
Smoking requirements: number of cigarettes
*/

const Card = () => {
    const [selectedFrequency, setSelectedFrequency] = useState(0)
    const [weeksFreq, setWeeksFreq] = useState(1)
    const [monthsFreq, setMonthsFreq] = useState(1)

    return (
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
                                <Selectable text="Sun"></Selectable>
                                <Selectable text="Mon"></Selectable>
                                <Selectable text="Tue"></Selectable>
                                <Selectable text="Wed"></Selectable>
                            </HStack>
                            <HStack space={2} justifyContent="center">
                                <Selectable text="Thu"></Selectable>
                                <Selectable text="Fri"></Selectable>
                                <Selectable text="Sat"></Selectable>
                            </HStack>
                        </VStack>
                    }
                    {selectedFrequency === 1  && 
                        <VStack space={2} alignItems='center'>
                            <Text>Every {weeksFreq} weeks</Text>
                            <Slider w="3/4" maxW="300" defaultValue={weeksFreq} minValue={1} maxValue={10} accessibilityLabel="hello world" step={1} onChange={(value) => {setWeeksFreq(value)}}>
                                <Slider.Track>
                                <Slider.FilledTrack />
                                </Slider.Track>
                                <Slider.Thumb />
                            </Slider>
                        </VStack>
                    }
                    {selectedFrequency === 2  && 
                        <VStack space={2} alignItems='center'>
                            <Text>Every {monthsFreq} months</Text>
                            <Slider w="3/4" maxW="300" defaultValue={monthsFreq} minValue={1} maxValue={10} accessibilityLabel="hello world" step={1} onChange={(value) => {setMonthsFreq(value)}}>
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
    );
}

export default Card;