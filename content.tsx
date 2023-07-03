import React from 'react';

import {
    Container,
    NativeBaseProvider,
    Box
} from 'native-base';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const Content = () => {
    // We want content to be a list of 
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <View style={styles.inner}>
                    <Text>Box 1</Text>
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.inner}>
                    <Text>Box 2</Text>
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.inner}>
                    <Text>Box 3</Text>
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.inner}>
                    <Text style={styles.text}>Box 4</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '85%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    box: {
        width: '50%',
        height: '50%',
        backgroundColor: '#eee',
        padding: 5,
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    text:
    {
        textAlign: 'center'
    }
});


export default Content;