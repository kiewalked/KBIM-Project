import React, { useEffect, useState } from 'react';

import {Container, NativeBaseProvider, Box, VStack, Center, HStack, WarningIcon, Button, Pressable, View, Text, Flex} from 'native-base';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FontAwesome from "react-native-vector-icons/FontAwesome"

import Icon from 'react-native-vector-icons/FontAwesome';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useNavigation, useRoute } from '@react-navigation/native';



const Footer = () => {
    const navigation = useNavigation();
    console.log(navigation.getCurrentRoute())
    const unsubscribe = navigation.addListener('state', (event) => {
        if (navigation.getCurrentRoute().name == 'Home') {
            setSelected(0);
            console.log("at home rn");
        }
        else if (navigation.getCurrentRoute().name == 'Settings') {
            setSelected(1);
            console.log("in settings rn");
        }
        else setSelected(2);
    });
    const [selected, setSelected] = useState(0);
    return (
        <Flex height='10%' background='gray.200' align='center' justify='center'>
            <HStack>
                <Pressable flex={1} onPress={() => navigation.navigate('Home')} opacity={selected === 0 ? 1 : 0.5}>
                    <Center>
                        <MaterialCommunityIcons name='home' size={40}/>
                        <Text>Home</Text>
                    </Center>
                </Pressable>
                <Pressable flex={1} onPress={() => navigation.navigate('Settings')} opacity={selected === 1 ? 1 : 0.5}>
                    <Center>
                        <FontAwesome name='gear' size={40}/>
                        <Text>Settings</Text>
                    </Center>
                </Pressable>
            </HStack>
        </Flex>
    );
};

export default Footer;
