import { StackScreenProps } from '@react-navigation/stack';
import {Image, Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button, HStack, ScrollView} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { Linking, StyleSheet } from 'react-native';

import { Camera, CameraPermissionStatus, useCameraDevices } from 'react-native-vision-camera'
import ButtonItem from '../../../components/ButtonItem';
import Item from '../../../components/Item';
import { Routes } from '../../../Routes';
import { useDispatch, useSelector } from 'react-redux';

type Props = StackScreenProps<Routes, 'Diet'>;

const DietScreen = ( { route, navigation }:Props ) => {

  // TLDR: I want the diet screen to act as a homepage for camera. There will be three default items for breakfast, lunch and dinner as well as an "add meal" button to slot another one in. When they click on breakfast, it will open a "CameraPage". In order to ensure that this camera page will work, I can run a function that checks whether we have permission to open the camera, and if so, then it opens the page, otherwise it prompts the user.
    const { date } = route.params;
    const dietPictures = useSelector(state => state.dailyHealth.history[date].diet);
    const dispatch = useDispatch();
    const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
    // So apparently declaring a function as async makes it into a "Promise" Object, which causes problems up the chain for rendering it as a React component. 
    // TODO: figure out how to fix this
            
    const openCamera = (index:Number) => {
      if (cameraPermission === 'authorized') navigation.navigate('Camera', { index, date });
      else requestCameraPermission();
    };

    console.log(useSelector(state => state.dailyHealth.history[date]));


    useEffect(() => {
      Camera.getCameraPermissionStatus().then(setCameraPermission);
    }, []);

    const requestCameraPermission = useCallback(async () => {
        console.log('Requesting camera permission...');
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`);
    
        if (permission === 'denied') await Linking.openSettings();
        setCameraPermission(permission);
      }, []);
  
    const imageContent0 = <Image source={dietPictures[0]} style={StyleSheet.absoluteFill} alt='camera'></Image>
    const imageContent1 = <Image source={dietPictures[1]} style={StyleSheet.absoluteFill} alt='camera'></Image>
    const imageContent2 = <Image source={dietPictures[2]} style={StyleSheet.absoluteFill} alt='camera'></Image>

    const exteriorContent0 = 
    <HStack space={4} alignItems='center'>
        <Text style={styles.title}>Breakfast</Text>
        <Button onPress={() => openCamera(0)}>Start</Button>
    </HStack>

    const exteriorContent1 = 
    <HStack space={4} alignItems='center'>
        <Text style={styles.title}>Lunch</Text>
      <Button onPress={() => openCamera(1)}>Start</Button>
    </HStack>

    const exteriorContent2 = 
    <HStack space={4} alignItems='center'>
        <Text style={styles.title}>Dinner</Text>
        <Button onPress={() => openCamera(2)}>Start</Button>
    </HStack>



    return (
      <ScrollView>
        <VStack marginTop={10} alignItems={'center'} space={10}>
          <ButtonItem imageContent={true} index={0} interiorContent={imageContent0} exteriorContent={exteriorContent0}/>
          <ButtonItem imageContent={true} index={1} interiorContent={imageContent1} exteriorContent={exteriorContent1} />
          <ButtonItem imageContent={true} index={2} interiorContent={imageContent2} exteriorContent={exteriorContent2} />
          {/* <ButtonItem>
            <Text style={styles.title} color='blue.400'>+ Add Meal</Text>
          </ButtonItem> */}
        </VStack>
      </ScrollView>
    )

}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 38,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
  title: {
    fontFamily: "Arial", 
    fontSize: 20,
    textAlignVertical: 'center'
  },
});


export default DietScreen;