import {Container, NativeBaseProvider, Box, VStack, Center, View, Text, Flex} from 'native-base';
import Footer from '../../components/Footer';

const StatisticsScreen = () => {
    return (
        <View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Statistics</Text>
            </View>
            <Footer/>
        </View>
    );
}

export default StatisticsScreen;