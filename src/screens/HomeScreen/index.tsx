import* as React from 'react'
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import Button from '../../components/Button';
import { useGetAlbumsQuery } from '../../api/jsonServerApi';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<{[x: string]: any}>();

    const mainAvatar = require('../../../assets/1.png');
    const handlePress = () => {
        navigation.navigate('GameEditScreen');
    }

    const { data:getAlbums  } = useGetAlbumsQuery(1);

    console.log("getAlbums",getAlbums);

    return (
        <View style={styles.ContentViewContainer}>
            <Image source={mainAvatar} />

            <Text style={styles.TextHeader}>No Game</Text>
            <Text style={styles.NormalText}>ゲームがありません。</Text>
            <Text>ゲームを登録してください。</Text>

            <Button label={"ゲームを登録する"} onPress={handlePress} />
        </View>
    )
};

export default HomeScreen;