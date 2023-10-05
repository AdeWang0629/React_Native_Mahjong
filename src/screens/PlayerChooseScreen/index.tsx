import* as React from 'react'
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Button from '../../components/Button';

const PlayerChooseScreen: React.FC = () => {
    const navigation = useNavigation<{[x: string]: any}>();

    const mainAvatar = require('../../../assets/people_plus_big.png');
    const handlePress = () => {
        navigation.navigate('GameEditScreen');
    }
    
    return (
        <View style={styles.ContentViewContainer}>
            <Image source={mainAvatar} style={styles.mainAvatar}/>

            <Text style={styles.TextHeader}>No Players Regist</Text>
            <Text style={styles.NormalText}>プレイヤーが未登録です。</Text>
            <Text>プレイヤーを登録してください。</Text>

            <Button label={"プレイヤーを登録する"} onPress={handlePress} />
        </View>
    )
};

export default PlayerChooseScreen;