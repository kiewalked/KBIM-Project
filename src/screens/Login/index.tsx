import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex, Button, FormControl, HStack, Heading, Input, Link, Image} from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../redux/authSlice';
import { StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Routes } from '../../Routes';
import { useState } from 'react';

type Props = StackScreenProps<Routes, 'Login'>

const LoginScreen = ({route, navigation}: Props) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Text>Login</Text>
        //     <Button onPress={() => dispatch(authenticate("hello", "world"))}>Login</Button>
        // </View>
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                {/* <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
                }}>
                    Welcome
                </Heading>
                <Heading mt="1" _dark={{
                color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                    Sign in to continue!
                </Heading> */}        
                <VStack space={3} mt="5">
                    <Box h="20%" mb="7">
                        <Image source={require('./logo.png')} style={styles.image} alt="KBIM Logo"></Image>
                    </Box>
                    <FormControl>
                        <FormControl.Label>Email ID</FormControl.Label>
                        <Input onChangeText={(value) => setUsername(value)}/>
                        </FormControl>
                        <FormControl>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input type="password" onChangeText={(value) => setPassword(value)}/>
                        <Link _text={{
                        fontSize: "xs",
                        fontWeight: "500",
                        color: "indigo.500"
                        }} alignSelf="flex-end" mt="1">
                            Forget Password?
                        </Link>
                    </FormControl>
                    <Button mt="2" colorScheme="indigo" onPress={() => dispatch(authenticate(username.toLowerCase(), password))}>
                    Sign in
                    </Button>
                    <HStack mt="6" justifyContent="center">
                        <Text fontSize="sm" color="coolGray.600" _dark={{
                        color: "warmGray.200"
                        }}>
                            I'm a new user.{" "}
                        </Text>
                        <Link 
                            _text={{
                            color: "indigo.500",
                            fontWeight: "medium",
                            fontSize: "sm"
                            }}
                            onPress={() => navigation.navigate("Signup")}
                        >
                            Sign Up
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </Center>
    );
}

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        height: 100
    }
});  


export default LoginScreen;