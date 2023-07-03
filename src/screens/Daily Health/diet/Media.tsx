import { StackScreenProps } from '@react-navigation/stack';
import {Container, Button, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Image} from 'native-base';
import { Routes } from '../../../Routes';
import { useCallback, useMemo, useState } from 'react';
import { Alert, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useDispatch, useSelector } from 'react-redux';
import { addPicture } from '../../../redux/dateSlice';

type Props = StackScreenProps<Routes, 'Media'>;

const MediaScreen = ( { route, navigation }: Props) => {
    const { path, index, date } = route.params;
    const source = useMemo(() => ({ uri: `file://${path}` }), [path]);
    const [savingState, setSavingState] = useState<'none' | 'saving' | 'saved'>('none');
    const dispatch = useDispatch();

    const requestSavePermission = async (): Promise<boolean> => {
        if (Platform.OS !== 'android') return true;
      
        const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        if (permission == null) return false;
        let hasPermission = await PermissionsAndroid.check(permission);
        if (!hasPermission) {
          const permissionRequestResult = await PermissionsAndroid.request(permission);
          hasPermission = permissionRequestResult === 'granted';
        }
        return hasPermission;
      };
      

    const onSavePressed = useCallback(async () => {
        try {
          setSavingState('saving');
    
          const hasPermission = await requestSavePermission();
          if (!hasPermission) {
            Alert.alert('Permission denied!', 'Vision Camera does not have permission to save the media to your camera roll.');
            return;
          }
          await CameraRoll.save(`file://${path}`, {
            type: 'photo',
          });
          setSavingState('saved');

          dispatch(addPicture(date, index, source))
          navigation.navigate('Diet', { date });
        } catch (e) {
          const message = e instanceof Error ? e.message : JSON.stringify(e);
          setSavingState('none');
          Alert.alert('Failed to save!', `An unexpected error occured while trying to save your photo. ${message}`);
        }
      }, [path]);    


    return (
        <View style={styles.container}>
            <Image source={source} style={StyleSheet.absoluteFill} resizeMode="cover" alt='camera'/>
            <Button onPress={onSavePressed}>Save Image</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
});

export default MediaScreen;