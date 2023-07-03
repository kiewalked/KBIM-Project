import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button, FormControl, Heading, Input} from 'native-base';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../redux/authSlice';
import { StackScreenProps } from '@react-navigation/stack';
import { Routes } from '../../Routes';

type Props = StackScreenProps<Routes, 'DailyHealth'>;

const SignupScreen = ( {route, navigation}: Props) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const authState = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const createAccount = () => {
        if (password !== confirmPassword) {
            console.log("passwords do not match!");
            return;
        } // check for invalid email, invalid password (less than 3 chars)
        dispatch(signup(username, password));
        navigation.navigate("Login")
    }

    return (
        <Center w="100%">
            <Box safeArea p="2" w="90%" maxW="290" py="8">
                <Heading size="lg" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }} fontWeight="semibold">
                Welcome
                </Heading>
                <Heading mt="1" color="coolGray.600" _dark={{
                color: "warmGray.200"
            }} fontWeight="medium" size="xs">
                Sign up to continue!
                </Heading>
                <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input onChangeText={(username) => setUsername(username)}/>
                </FormControl>
                <FormControl>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input type="password" onChangeText={(password) => setPassword(password)}/>
                </FormControl>
                <FormControl>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input type="password" onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}/>
                </FormControl>
                <Button onPress={() => createAccount()}mt="2" colorScheme="indigo">
                    Sign up
                </Button>
                </VStack>
            </Box>
        </Center>
    );
}

export default SignupScreen;