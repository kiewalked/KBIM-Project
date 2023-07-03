import { StackScreenProps } from '@react-navigation/stack';
import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, HStack, Button} from 'native-base';
import { Pressable, StyleSheet } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Routes } from '../../../Routes';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/authSlice';

type Props = StackScreenProps<Routes, 'Settings'>

const SettingsScreen = ( {route, navigation}: Props) => {
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1}}>
            <VStack space={4} paddingLeft={4} marginTop={4} paddingRight={4}>
                <Box>
                    <Pressable onPress={() => console.log("I'm feedbaack!")}>
                        <HStack alignItems='center'>
                            <Text style={styles.text} flex={30}>Preferences</Text>
                            <FontAwesome size={20} name='angle-right' style={{flex: 1}}/>
                        </HStack>
                    </Pressable>
                </Box>
                <Box>
                    <Pressable onPress={() => navigation.navigate("NotificationSettings")}>
                        <HStack alignItems='center'>
                            <Text style={styles.text} flex={30}>Notifications</Text>
                            <FontAwesome size={20} name='angle-right' style={{flex: 1}}/>
                        </HStack>
                    </Pressable>
                </Box>
                <Box>
                    <Pressable>
                        <HStack alignItems='center'>
                            <Text style={styles.text} flex={30}>Feedback</Text>
                            <FontAwesome size={20} name='angle-right' style={{flex: 1}}/>
                        </HStack>
                    </Pressable>
                </Box>
                <Box>
                    <Pressable onPress={() => navigation.navigate("Export")}>
                        <HStack alignItems='center'>
                            <Text style={styles.text} flex={30}>Export</Text>
                            <FontAwesome size={20} name='angle-right' style={{flex: 1}}/>
                        </HStack>
                    </Pressable>
                </Box>
                <Button onPress={() => dispatch(logout("hello"))}>Logout</Button>
            </VStack>
        </View>
    );
}

// const styles = StyleSheet.create({
//     text: {
//         font-size: '20'
//     }
// });

const styles = StyleSheet.create({
    text: {
      fontSize: 16
    },
});  

export default SettingsScreen;