import * as React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
const mainAvatar = require('../../../assets/person.png');
import  Icon  from "react-native-vector-icons/Ionicons";
import COLORS from '../../theme/colors';

const NoData : React.FC = () => {
    const navigation = useNavigation<{[x: string]: any}>();

    const handlePress = () => {
        navigation.navigate('PlayerEditScreen');
    }

    return (
        <View style={styles.NoContentViewContainer}>
            <Icon name="person-add-outline" size={300} color={COLORS.BLACK}/>

            <Text style={styles.TextHeader}>Please register players.</Text>

            <Button label={"プレイヤーを登録する"} onPress={handlePress} />
        </View>
    )
}

export default NoData;