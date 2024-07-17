import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button} from 'native-base';
import notifee from '@notifee/react-native'
import Item from '../../components/Item';
import ButtonItem from '../../components/ButtonItem';
import { useSelector } from 'react-redux';
import { useState } from 'react';

/*
Goals screen should be an area where we define requirements for exercise, sleep & diet
Exercise requirement examples: minutes exercised
Sleep requirement: hours slept
Diet requirement: meals consumed, alcoholic beverages consumed
Smoking requirements: number of cigarettes
*/


const GoalScreen = () => {
    const goals = useSelector(state => state.goal.goals)

    console.log("Goals redux store: ", goals)

    let listStr = ''

    const goalList = goals

    const exerciseGoalList = goals.filter((goal) => goal["category"] == 'exercise')
    const sleepGoalList = goals.filter((goal) => goal["category"] == 'sleep')
    const dietGoalList = goals.filter((goal) => goal["category"] == 'diet')
    const miscGoalList = goals.filter((goal) => goal["category"] == 'misc')
    // const sleepGoalList = goals.sleep
    // const miscGoalList = goals.misc
    // const dietGoalList = goals.diet
    let exerciseStr = ''
    for (let i = 1; i <= exerciseGoalList.length; i++) {
        const exerciseObj = exerciseGoalList[i-1]
        const intensity = exerciseObj.categoryObj['intensity']
        console.log("intensity:", intensity)
        let goalStr = `Goal ${i} - You have a goal of ${exerciseObj.quantity} minutes of ${intensity} exercise `
        exerciseObj.frequency == "daily" ? goalStr += `daily\n` : goalStr += ` ${exerciseObj.frequency}\n`
        listStr += goalStr
        console.log("listStr: ", listStr)
    }
    const defaultStr = 
        <Box alignItems="center">
            <Text textAlign='center'>{listStr}</Text>
        </Box>
    const [ exerciseGoalStr, setExerciseGoalStr ] = useState('')
    const [ sleepGoalStr, setSleepGoalStr ] = useState('')
    const [ dietGoalStr, setDietGoalStr ] = useState('')
    console.log("All goals: ", goalList)
    console.log("Exercise goals: ", exerciseGoalList)

    return (
        <VStack marginTop={10} alignItems={'center'} space={10}>
            <ButtonItem title="Exercise" interiorContent={exerciseGoalStr == '' ? defaultStr : exerciseGoalStr}></ButtonItem>
            <ButtonItem title="Sleep" interiorContent={sleepGoalStr == '' ? defaultStr : sleepGoalStr}></ButtonItem>
            <ButtonItem title="Diet" interiorContent={dietGoalStr == '' ? defaultStr : dietGoalStr}></ButtonItem>
            <Item route="GoalAddition">
                <Text color='blue.400'>+ Add Goal</Text>
            </Item>
        </VStack>
    );
}

export default GoalScreen;