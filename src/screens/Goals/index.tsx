import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button} from 'native-base';
import notifee from '@notifee/react-native'
import Item from '../../components/Item';
import ButtonItem from '../../components/ButtonItem';

/*
Goals screen should be an area where we define requirements for exercise, sleep & diet
Exercise requirement examples: minutes exercised
Sleep requirement: hours slept
Diet requirement: meals consumed, alcoholic beverages consumed
Smoking requirements: number of cigarettes
*/

const GoalScreen = () => {
    return (
        <VStack marginTop={10} alignItems={'center'} space={10}>
            <ButtonItem title="Exercise"></ButtonItem>
            <ButtonItem title="Sleep"></ButtonItem>
            <ButtonItem title="Diet"></ButtonItem>
            <Item route="GoalAddition">
                <Text color='blue.400'>+ Add Goal</Text>
            </Item>
        </VStack>
    );
}

export default GoalScreen;