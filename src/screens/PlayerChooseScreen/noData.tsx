import * as React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
const mainAvatar = require('../../../assets/people_plus_big.png');

const NoData : React.FC = () => {
    const navigation = useNavigation<{[x: string]: any}>();

    const handlePress = () => {
        navigation.navigate('PlayerEditScreen');
    }

    return (
        <View style={styles.NoContentViewContainer}>
            <Image source={mainAvatar} style={styles.mainAvatar}/>

            <Text style={styles.TextHeader}>No Players Registered</Text>
            <Text style={styles.NormalText}>プレイヤーが未登録です。</Text>
            <Text>プレイヤーを登録してください。</Text>

            <Button label={"プレイヤーを登録する"} onPress={handlePress} />
        </View>
    )
}

export default NoData;