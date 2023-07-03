import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {Container, NativeBaseProvider, Box, VStack, Center, HStack, WarningIcon, Button, View, Text} from 'native-base';
import { StyleSheet } from 'react-native'

import StatusCircle from './statusCircle';

import { useNavigation } from '@react-navigation/native';    

interface Props {
    icon?: string; 
    iconColor?: string;
    title?: string;
    status?: boolean;
    statusColor?: string;
    route?: string;
    children: React.ReactNode
    date?: string;
}

const Item: React.FC<Props> = ({
    icon,
    iconColor,
    title,
    status,
    statusColor,
    route = 'Details',
    children,
    date,
}) => {
  const navigation = useNavigation();
  return (
    <Button 
      w='85%' h='20' bg="gray.300" 
      rounded="md" style={styles.item} shadow={3} 
      onPress={() => { 
        if (date !== undefined) {
          navigation.navigate(route, {date: date});
          console.log(date);
        }
        else {
          navigation.navigate(route);
          console.log("sent without date");
        }
      }}>
        <HStack space={4} alignItems='center'>
            <Foundation name={icon} size={25} color={iconColor ? iconColor : '#000000'}></Foundation>
            <Text style={styles.title}>{children}</Text>
            <StatusCircle status={status} statusColor={statusColor}/>
        </HStack>
    </Button>
  );
};

const styles = StyleSheet.create({
  item: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  title: {
    fontFamily: "Arial", 
    fontSize: 20,
    textAlignVertical: 'center'
  },
});

export default Item;
