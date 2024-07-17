import React, { useState } from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {Container, NativeBaseProvider, Box, VStack, Center, HStack, WarningIcon, Button, View, Text, Flex} from 'native-base';
import { Image, StyleSheet } from 'react-native'

import StatusCircle from './statusCircle';

import { useNavigation } from '@react-navigation/native';    
import Collapsible from 'react-native-collapsible';

interface Props {
    icon?: string; 
    title?: string;
    status?: boolean;
    statusColor?: string;
    index?: Number;
    route?: string;
    children?: React.ReactNode
    imageContent?: boolean
    textContent?: React.ReactNode
    exteriorContent?: React.ReactNode
    interiorContent?: React.ReactNode
    date?: string;
    key?: Number
}

const Item: React.FC<Props> = ({
    icon,
    title,
    status,
    statusColor,
    index,
    route = 'Details',
    children,
    imageContent,
    textContent,
    exteriorContent,
    interiorContent,
    date,
    key,
}) => {
  const [ collapsedState, setCollapsedState ] = useState(true);
  const navigation = useNavigation();
  return (
    <View w='85%'>
      <Button 
        h='20' 
        bg="gray.300" 
        rounded="md" 
        style={styles.item} 
        shadow={3} 
        alignItems='center' 
        justifyContent='center'
        onPress={() => setCollapsedState(!collapsedState)}
        zIndex={999}
      >
          <HStack space={4} alignItems='center'>
              {icon != null && <Foundation name={icon} size={25}></Foundation>}
              <Text style={styles.title}>{title}</Text>
              {exteriorContent != null && exteriorContent}
          </HStack>
      </Button>
      <Collapsible collapsed={collapsedState} align="top">
        <View bg='gray.200' rounded="md" w="98%" alignSelf="center" zIndex="-999" padding={2} minHeight={(imageContent) ? "400" : "0"}>
            {interiorContent != null && interiorContent}
        </View>
      </Collapsible>
    </View>
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
    fontFamily: "Montserrat",
    fontSize: 20,
    textAlignVertical: 'center'
  },
});

export default Item;
