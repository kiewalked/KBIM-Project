import React from 'react';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Foundation from 'react-native-vector-icons/Foundation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import {Container, NativeBaseProvider, Box, VStack, Center, HStack, WarningIcon, Button} from 'native-base';

import {View, Text, StyleSheet} from 'react-native';
import { Ellipse } from 'react-native-svg';
    
interface Props {
    status?: boolean;
    statusColor?: string;
}

const StatusCircle: React.FC<Props> = ({
    status,
    statusColor
}) => {
  if (status) {
  return (
        <FontAwesome name={'circle'} color={statusColor}></FontAwesome>
  );
  } else {
    return null;
  }
};

export default StatusCircle;
