import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Switch, HStack, Pressable, Button, Select, Input, Modal, FormControl} from 'native-base';
import { Alert, Dimensions, Platform, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import notifee, { AuthorizationStatus, TimestampTrigger, TriggerType, TimeUnit, RepeatFrequency } from '@notifee/react-native';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import { useDispatch, useSelector } from 'react-redux';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

const ExportScreen = () => {
    const [ notificationsEnabled, setNotificationsEnabled ] = useState(false)
    const [ startDate, setStartDate ] = useState(new Date());
    const [ startOpen, setStartOpen ] = useState(false)
    const [ endDate, setEndDate ] = useState(new Date());
    const [ endOpen, setEndOpen ] = useState(false)
    const history = useSelector(state => state.dailyHealth.history)
    const [ PDFState, setPDFState ] = useState(false)
    const [ clinician, setClinician ] = useState('');
    const [count, setCount] = useState(1);  
    const [showPDF, setShowPDF] = useState(false)
    const [ pdfSource, setPDFSource ] = useState({});
    const [ password, setPassword ] = useState('')

    const exportData = () => {
        console.log(history)
        for (let day in history) {
            if (startDate < Date.parse(day) && endDate > Date.parse(day)) {
                // process information in history and add to pdf
                
                // exercise processing
                for (let key in history[day].exercises) {
                    const exercise = history[day].exercises[key]
                    console.log("exercise: ", exercise)
                }

                // sleep processing
                const sleep = history[day].sleep

                // diet processing
                for (let key in history[day].diets) {
                    const diet = history[day].diet[key]
                    console.log("diet: ", diet)
                }

            }
        }
    }

    const createPDF = async () => {
        let options = {
            html: '<h1>PDF TEST</h1>',
            fileName: 'test',
            directory: 'Documents',
          };
      
          let file = await RNHTMLtoPDF.convert(options)
          setPDFSource({
            uri: file.filePath
          })          
          console.log(file.filePath);
    }

    const [showModal, setShowModal] = useState(false);
  
    return (
        <View style={{ flex: 1}}>
            <VStack space={4} paddingLeft={4} marginTop={4} paddingRight={4}>
                {/* <Select 
                    selectedValue={clinician} 
                    minWidth="100%" 
                    accessibilityLabel="Choose Clinician" 
                    placeholder="Choose Clinician" 
                    onValueChange={ (itemValue) => setClinician(itemValue)}>
                    <Select.Item label="Abbey Pearson" value="abbey" />
                    <Select.Item label="Oscar Lederman" value="oscar" />
                    <Select.Item label="Patrick Gould" value="patrick" />
                </Select>             */}
                <Input 
                placeholder="Enter your clinician's email"
                onChangeText={(value) => {
                    setClinician(value)
                    console.log(clinician);
                }}/>
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
                <Button onPress={() => {setShowModal(true)}}>Export</Button>
            </VStack>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Header>Enter Credentials</Modal.Header>
                <Modal.Body>
                    <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input onChangeText={(value) => setPassword(value)} type="password" placeholder="Enter Password"/>
                    </FormControl>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                    <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                    setShowModal(false);
                    }}>
                        Cancel
                    </Button>
                    <Button onPress={() => {
                    setShowModal(false);
                    sendEmail()
                    }}>
                        Save
                    </Button>
                    </Button.Group>
                </Modal.Footer>
                </Modal.Content>
            </Modal>

        </View>
    );
}

const styles = StyleSheet.create({
    text: {
      fontSize: 18
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});  


export default ExportScreen;