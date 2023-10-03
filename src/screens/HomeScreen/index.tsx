import* as React from 'react'
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Button from '../../components/Button';
import { StackNavigationProp } from "@react-navigation/stack";

const Home: React.FC = () => {
    const navigation = useNavigation<{[x: string]: any}>();
    const details = "Details";

    const mainAvatar = require('../../../assets/1.png');
    const handlePress = () => {
        console.log('asdf');
        navigation.navigate('Details');
    }
    
    return (
        <View style={styles.ContentViewContainer}>
            <Image source={mainAvatar} />

            <Text style={styles.TextHeader}>No Gamepopo</Text>
            <Text style={styles.NormalText}>ゲームがありません。</Text>
            <Text>ゲームを登録してください。</Text>

            <Button label={"ゲームを登録する"} onPress={handlePress} />
        </View>
    )
};

export default Home;