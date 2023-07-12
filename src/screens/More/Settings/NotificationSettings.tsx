import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Switch, HStack, Pressable, Button} from 'native-base';
import { Platform, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import notifee, { AuthorizationStatus, TimestampTrigger, TriggerType, TimeUnit, RepeatFrequency } from '@notifee/react-native';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker'

const NotificationSettingsScreen = () => {
    const [ notificationsEnabled, setNotificationsEnabled ]  = useState(false)
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
  
    const onChangeNotificationTime = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      scheduleNotification();
    };
      
    const enableNotifications = (val) => {
        if (val) {
            setNotificationsEnabled(true);
            requestUserPermission();
        } 
        else setNotificationsEnabled(false);
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
                            <Text style={styles.text} flex={6}>Select Notification Time</Text>
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode='time'
                                is24Hour={true}
                                onChange={onChangeNotificationTime}
                            />
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
      fontSize: 16
    },
});  


export default NotificationSettingsScreen;