import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Switch, HStack, Pressable, Button} from 'native-base';
import { Platform, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import notifee, { AuthorizationStatus, TimestampTrigger, TriggerType, TimeUnit, RepeatFrequency } from '@notifee/react-native';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import { withSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { toggleNotifications, changeNotificationTime } from '../../../redux/notificationSlice';

const NotificationSettingsScreen = () => {
    const notificationState = useSelector(state => state.notifications)    
    const notificationsEnabled = notificationState.notificationsEnabled
    const notificationTime = notificationState.notificationTime
    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
  
    const onChangeNotificationTime = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      scheduleNotification();
    };

    const convertHoursToDate = () =>           {
        console.log(notificationTime)
    }
      
    const enableNotifications = (val) => {
        if (val) {
            dispatch(toggleNotifications(true));
            requestUserPermission();
        } 
        else dispatch(toggleNotifications(false));
        ;
    }

    async function scheduleNotification() {
        if (notificationsEnabled) {
            console.log(`Recurring notification set for ${date.toString()}`)
            const trigger: TimestampTrigger = {
                type: TriggerType.TIMESTAMP,
                timestamp: date.getTime(), // fire in 3 hours
                repeatFrequency: RepeatFrequency.DAILY, // repeat once a day
            };
        // Display a notification
            // await notifee.displayNotification({
            //     title: 'KBIM App',
            //     body: "Don't forget to complete your daily health survey!",
            //     android: {
            //         channelId,
            //         smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            //         // pressAction is needed if you want the notification to open the app when pressed
            //         pressAction: {
            //             id: 'default',
            //         },
            //     },
            // });
            notifee.cancelTriggerNotifications()
            await notifee.createTriggerNotification(
                {
                  id: '123',
                  title: 'KBIM App',
                  body: "Don't forget to complete your daily health survey!",
                  android: {
                    channelId: 'default',
                  },
                },
                trigger,
            );
        }
    }

    async function requestUserPermission() {
        const settings = await notifee.requestPermission();
      
        if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
          console.log('Permission settings:', settings);
        } else {
          console.log('User declined permissions');
        }
    }
    return (
        <View style={{ flex: 1}}>
            <VStack space={4} paddingLeft={4} marginTop={4} paddingRight={4}>
                <Box>
                    <HStack alignItems='center' space={4}>
                        <Text style={styles.text} flex={6}>Enable Notifications</Text>
                        <Switch style={{flex: 1}} onValueChange = {(val) => enableNotifications(val)}/>
                    </HStack>
                </Box>
                { notificationsEnabled && 
                    <Box>
                        <HStack alignItems='center' space={4}>
                            <Text style={styles.text} flex={5}>Select Notification Time</Text>
                            <Button flex={1} onPress={() => setOpen(true)}>
                                <Text paddingLeft="0" fontSize="md" color="white">{date.toTimeString().split(" ")[0].slice(0,-3)}</Text>
                            </Button>
                            <DatePicker 
                            modal
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                                scheduleNotification();
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                            mode="time"/>
                        </HStack>
                    </Box>
                }
                {/* <Text>selected: {date.toLocaleString()}</Text> */}
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
      fontSize: 16,
    },
});  


export default NotificationSettingsScreen;