import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button} from 'native-base';
import Item from '../../../components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { selectCount } from '../../../redux/counterSlice';
import { Routes } from '../../../Routes';
import { StackScreenProps } from '@react-navigation/stack';
import { selectExercise } from '../../../redux/exerciseSlice';
import { FlatList } from 'react-native';
import ButtonItem from '../../../components/ButtonItem';
import { verifyDateExists } from '../../../redux/dateSlice';

type Props = StackScreenProps<Routes, 'PhysicalActivity'>;

const PhysicalActivityScreen = ( { route, navigation }:Props) => {
    const { date } = route.params;
    const dispatch = useDispatch();
    const exercises = useSelector(state => state.dailyHealth.history[date].exercises);
    const count = useSelector(selectCount);

    const exerciseItems = []
    // console.log(useSelector(state => state.dailyHealth.history[date]));

    for (let i = 0; i < exercises.length; i++) {
        const exerciseInfo = 
            <View>
                <Text textAlign='center'>You exercised for {exercises[i].time} minutes at a {exercises[i].intensity} intensity. Well done!</Text>
                {/* <Button>Edit</Button> */}
            </View>;
        exerciseItems.push(
            <ButtonItem textContent={exerciseInfo} title={exercises[i].title} key={i}/>
        );
    }
    return (
        <VStack marginTop={10} alignItems={'center'} space={10}>
            {exerciseItems}
            <Item route='Exercise' date={date}>
                <Text color='blue.400'>+ Add Exercise</Text>
            </Item>
        </VStack>
        );
}

export default PhysicalActivityScreen;