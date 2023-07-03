import { StackScreenProps } from '@react-navigation/stack';
import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button} from 'native-base';
import React, { useCallback, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Camera, PhotoFile, useCameraDevices } from 'react-native-vision-camera';
import { Routes } from '../../../Routes';


type Props = StackScreenProps<Routes, 'Camera'>;


const CameraScreen = ( { route, navigation }:Props) => {
    const { index, date } = route.params;
    const devices = useCameraDevices()
    const device = devices.back

    const camera = useRef<Camera>(null);
  
    const onMediaCaptured = useCallback(
      (media: PhotoFile) => {
        console.log(`Media captured! ${JSON.stringify(media)}`);
        navigation.navigate('Media', {
          path: media.path,
          index: index,
          date: date,
        });
      }, [navigation]);

    const takePhoto = useCallback(async () => {
      try {
        if (camera.current == null) throw new Error('Camera ref is null!');
  
        console.log('Taking photo...');
        const photo = await camera.current.takeSnapshot({
          quality: 85,
          skipMetadata: true
        });
        console.log('Photo success!');
        onMediaCaptured(photo);
      } catch (e) {
        console.error('Failed to take photo!', e);
      }  
    }, [camera])

    if (device == null) return <View />
    return (
      <View style={styles.container}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          photo={true}
        />
        <Button onPress={takePhoto}>Take photo</Button>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default CameraScreen;