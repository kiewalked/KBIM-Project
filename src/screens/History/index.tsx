import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from '../../Routes';
import { StackScreenProps } from '@react-navigation/stack';
import ButtonItem from '../../components/ButtonItem';
import Item from '../../components/Item';

type Props = StackScreenProps<Routes, 'History'>;

const HistoryScreen = ( {route, navigation }: Props) => {
    const date = route.params.date;
    console.log("today's date: ", date);
    const storedDays = useSelector(state => state.dailyHealth.history);
    const dispatch = useDispatch();

    const dateLessThan = (date1str:string, date2str:string) => {
        const date1 = Date.parse(date1str);
        const date2 = Date.parse(date2str);
        return date1 < date2 ? true : false;
    }

    const historyList = []

    console.log("historical date: ", Object.keys(storedDays)[0]);

    for (let i = 0; i < Object.keys(storedDays).length; i++) {
        if (dateLessThan(Object.keys(storedDays)[i], date)) {
            historyList.push(
                <Item date={Object.keys(storedDays)[i]} route='DailyHealth'>
                    <Text>{Object.keys(storedDays)[i]}</Text>
                </Item>
            )
        }
    }

    // historyList.sort((a, b) => {
    //     return a.date < b.date;
    // })
    return (
        <VStack marginTop={10} alignItems={'center'} space={10}>
            {historyList}
        </VStack>
    );
}

export default HistoryScreen;