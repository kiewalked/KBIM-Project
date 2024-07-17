import React from 'react';

import { View, Text } from 'react-native'

import { NativeBaseProvider, Container, Center } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/Home'
import DailyHealthScreen from './screens/Daily Health/index'
import PhysicalActivityScreen from './screens/Daily Health/exercise/PhysicalActivity'
import DietScreen from './screens/Daily Health/diet/Diet'
import MediaScreen from './screens/Daily Health/diet/Media'
import GoalsScreen from './screens/Goals'
import LoginScreen from './screens/Login'
import SettingsScreen from './screens/More/Settings'
import Footer from './components/Footer'

import { createStackNavigator } from '@react-navigation/stack';

import { Provider, useSelector } from 'react-redux';
import { Store } from './redux/store';

import { useEffect, useState } from 'react';

import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import ExerciseAdditionScreen from './screens/Daily Health/exercise/ExerciseAddition';
import CameraScreen from './screens/Daily Health/diet/Camera';


import type { Routes } from './Routes'
import StatisticsScreen from './screens/Statistics';
import HistoryScreen from './screens/History';
import NotificationSettingsScreen from './screens/More/Settings/NotificationSettings';
import SignupScreen from './screens/Login/Signup';
import GoalAdditionScreen from './screens/Goals/GoalAddition';
import ExportScreen from './screens/More/Settings/Export';

const Stack = createStackNavigator<Routes>();

const Root = () => {    
    // const isSignedIn = useSelector(state => state.auth.isSignedIn)
    const isSignedIn = useState(true);
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                {isSignedIn ? (
                    <>
                        <Stack.Screen name='Home' component={HomeScreen} />
                        <Stack.Screen name='DailyHealth' component={DailyHealthScreen} />
                        <Stack.Screen name='PhysicalActivity' component={PhysicalActivityScreen} />
                        <Stack.Screen name='Diet' component={DietScreen} />
                        <Stack.Screen name='Goals' component={GoalsScreen} />
                        <Stack.Screen name='Settings' component={SettingsScreen} />
                        <Stack.Screen name='Exercise' component={ExerciseAdditionScreen} />
                        <Stack.Screen name='Camera' component={CameraScreen} />
                        <Stack.Screen name='Media' component={MediaScreen} />
                        <Stack.Screen name='Statistics' component={StatisticsScreen} />
                        <Stack.Screen name='History' component={HistoryScreen} />
                        <Stack.Screen name='NotificationSettings' component={NotificationSettingsScreen} />
                        <Stack.Screen name='GoalAddition' component={GoalAdditionScreen} />
                        <Stack.Screen name='Export' component={ExportScreen} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name='Login' component={LoginScreen} />
                        <Stack.Screen name='Signup' component={SignupScreen} />
                    </>
                )}
            </Stack.Navigator>
            <Footer/>
        </NavigationContainer>
    )
}

export default Root;