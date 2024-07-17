/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';

import React from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { Text } from 'native-base'

import Root from './src/RootComponent';

import { NativeBaseProvider, Container, Center, extendTheme } from 'native-base';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import setDefaultProps from 'react-native-simple-default-props'


const theme = extendTheme({
  fontConfig: {
    Montserrat: {
      100: {
        normal: "Montserrat-Regular",
        italic: "Montserrat-Italic",
      },
      200: {
        normal: "Montserrat-Regular",
        italic: "Montserrat-Italic",
      },
      300: {
        normal: "Montserrat-Regular",
        italic: "Montserrat-Italic",
      },
      // 400: {
      //   normal: "Roboto-Regular",
      //   italic: "Roboto-Italic",
      // },
      // 500: {
      //   normal: "Roboto-Medium",
      // },
      600: {
        normal: "Montserrat-Bold",
        italic: "Montserrat-Italic",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
    mono: "Montserrat",
  },
});


const defaultText = {
  style: [{fontFamily: 'Montserrat'}],
};

// usage
setDefaultProps(Text, defaultText);



function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  // Structure heavily inspired by native-base kitchen sink
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Root />
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
