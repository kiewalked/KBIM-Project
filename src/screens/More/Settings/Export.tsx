import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Switch, HStack, Pressable, Button, Select} from 'native-base';
import { Platform, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import notifee, { AuthorizationStatus, TimestampTrigger, TriggerType, TimeUnit, RepeatFrequency } from '@notifee/react-native';
import { useState } from 'react';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'

const ExportScreen = () => {
    const [ notificationsEnabled, setNotificationsEnabled ] = useState(false)
    const [ startDate, setStartDate ] = useState(new Date());
    const [ endDate, setEndDate ] = useState(new Date());
    const [ clinician, setClinician ] = useState('');

    const onChangeDate = (event:DateTimePickerEvent, selectedDate:Date|undefined, start:boolean) => {
        if (selectedDate) {
            const currentDate = selectedDate;
            console.log("date: ", currentDate)
            start ? setStartDate(currentDate) : setEndDate(currentDate)
        }
      };
  
  
    return (
        <View style={{ flex: 1}}>
            <VStack space={4} paddingLeft={4} marginTop={4} paddingRight={4}>
                <Select 
                    selectedValue={clinician} 
                    minWidth="100%" 
                    accessibilityLabel="Choose Clinician" 
                    placeholder="Choose Clinician" 
                    onValueChange={ (itemValue) => setClinician(itemValue)}>
                    <Select.Item label="Abbey Pearson" value="abbey" />
                    <Select.Item label="Oscar Lederman" value="oscar" />
                    <Select.Item label="Patrick Gould" value="patrick" />
                </Select>            
                <Box>
                    <HStack alignItems='center' space={4}>
                        <Text style={styles.text} flex={6}>Start Date</Text>
                        <DateTimePicker
                            testID="startDatePicker"
                            value={startDate}
                            mode='date'
                            onChange={(event:DateTimePickerEvent, selectedDate:Date|undefined) => onChangeDate(event, selectedDate, false)}

                        />
                    </HStack>
                </Box>
                <Box>
                    <HStack alignItems='center' space={4}>
                        <Text style={styles.text} flex={6}>End Date</Text>
                        <DateTimePicker
                            testID="endDatePicker"
                            value={endDate}
                            onChange={(event:DateTimePickerEvent, selectedDate:Date|undefined) => onChangeDate(event, selectedDate, true)}
                        />
                    </HStack>
                </Box>
                <Button>Export</Button>
            </VStack>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
      fontSize: 18
    },
});  


export default ExportScreen;