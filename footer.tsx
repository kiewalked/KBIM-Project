import React from 'react';

import {Container, NativeBaseProvider, Box} from 'native-base';

import {View, Text, StyleSheet} from 'react-native';

const Footer = () => {
  return <View style={styles.footer} />;
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    height: '15%',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
});

export default Footer;
