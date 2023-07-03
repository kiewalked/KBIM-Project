import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button, AspectRatio, HStack, Heading, Image, Stack, Pressable} from 'native-base';
import notifee from '@notifee/react-native'
import Item from '../../components/Item';
import ButtonItem from '../../components/ButtonItem';
import { useState } from 'react';

/*
Goals screen should be an area where we define requirements for exercise, sleep & diet
Exercise requirement examples: minutes exercised
Sleep requirement: hours slept
Diet requirement: meals consumed, alcoholic beverages consumed
Smoking requirements: number of cigarettes
*/

interface Props {
    text?: string; 
    dayArray: Array<boolean>;
    handleCallback: (newArr: Array<boolean>) => void
    dayNum: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const Selectable: React.FC<Props> = ({
    text,
    dayArray,
    handleCallback,
    dayNum
}) => {
    const [selected, setSelected] = useState(0)
    const toggleBGColor = () => {
        let newArr = [...dayArray]
        newArr[dayNum] = !newArr[dayNum]            
        handleCallback(newArr)
    }

    return (
        <Pressable flex={1} onPress={() => toggleBGColor()}>
            <Box rounded="lg" backgroundColor={dayArray[dayNum] ? "orange.400" : "gray.50"}>
                <Text textAlign="center" color={dayArray[dayNum] ? "white" : "black"}>{text}</Text>
            </Box>
        </Pressable>
    );
}

export default Selectable;