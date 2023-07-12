import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Switch, HStack, Pressable, Button, Select} from 'native-base';
import { Platform, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import notifee, { AuthorizationStatus, TimestampTrigger, TriggerType, TimeUnit, RepeatFrequency } from '@notifee/react-native';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import { useDispatch, useSelector } from 'react-redux';

const ExportScreen = () => {
    const [ notificationsEnabled, setNotificationsEnabled ] = useState(false)
    const [ startDate, setStartDate ] = useState(new Date());
    const [ startOpen, setStartOpen ] = useState(false)
    const [ endDate, setEndDate ] = useState(new Date());
    const [ endOpen, setEndOpen ] = useState(false)
    const history = useSelector(state => state.dailyHealth.history)

    const [ clinician, setClinician ] = useState('');
    

    const exportData = () => {
        console.log(history)
        for (let day in history) {
            if (startDate < Date.parse(day) && endDate > Date.parse(day)) {
                // process information in history and add to pdf
            }
        }
    }
  
  
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
                        <Button flex={4} padding='1' paddingLeft='0' paddingRight='1' m onPress={() => {setStartOpen(true)}}>{startDate.toDateString()}</Button>
                        <DatePicker 
                        modal
                        open={startOpen}
                        date={startDate}
                        onConfirm={(date) => {
                            setStartOpen(false)
                            setStartDate(date)
                        }}
                        onCancel={() => {
                            setStartOpen(false)
                        }}
                        mode="date"/>
                    </HStack>
                </Box>
                <Box>
                    <HStack alignItems='center' space={4} >
                        <Text style={styles.text} flex={6}>End Date</Text>
                        <Button flex={4} padding='1' paddingLeft='0' paddingRight='1' onPress={() => {setEndOpen(true)}}>{endDate.toDateString()}</Button>
                        <DatePicker 
                        modal
                        open={endOpen}
                        date={endDate}
                        onConfirm={(date) => {
                            setEndOpen(false)
                            setEndDate(date)
                        }}
                        onCancel={() => {
                            setEndOpen(false)
                        }}
                        mode="date"/>
                    </HStack>
                </Box>
                <Button onPress={() => {exportData()}}>Export</Button>
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