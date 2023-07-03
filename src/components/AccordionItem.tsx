import React, { useState } from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {Container, NativeBaseProvider, Box, VStack, Center, HStack, WarningIcon, Button, View, Text} from 'native-base';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'

import StatusCircle from './statusCircle';

import { useNavigation } from '@react-navigation/native';    
import Accordion from 'react-native-collapsible'
import Collapsible from 'react-native-collapsible';

interface Props {
    icon?: string; 
    title?: string;
    status?: boolean;
    statusColor?: string;
    route?: string;
    children?: React.ReactNode
}

const Item: React.FC<Props> = ({
    icon,
    title,
    status,
    statusColor,
    route = 'Details',
    children,
}) => {
  
  const [ collapsedState, setCollapsedState ] = useState(true);

  const navigation = useNavigation();
  return (
    <View w='85%'>
      <Button 
        bg="gray.300" h="20" zIndex="999"
        rounded="md" style={styles.item} shadow={3} 
        onPress={() => {setCollapsedState(!collapsedState)}}>
          <HStack space={4} alignItems='center'>
              <Foundation name={icon} size={25}></Foundation>
              <Text style={styles.title}>{children}</Text>
              <StatusCircle status={status} statusColor={statusColor}/>
          </HStack>
      </Button>
      <Collapsible collapsed={collapsedState} align="top">
        <View bg='gray.200' rounded="md" w="98%" alignSelf="center" zIndex="-999" padding={2}>
          <Text>
            Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
            ribs
          </Text>
        </View>
      </Collapsible>
    </View>

  );
};

const styles = StyleSheet.create({
  content: {
    color: "amber.300",
  },
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
  container: {
    flex: 1
  },
  accordContainer: {
    paddingBottom: 4
  },
  accordHeader: {
    padding: 12,
    backgroundColor: '#666',
    color: '#eee',
    flex: 1,
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  accordTitle: {
    fontSize: 20,
  },
  accordBody: {
    padding: 12
  },
  textSmall: {
    fontSize: 16
  },
  seperator: {
    height: 12
  }

});

export default Item;
