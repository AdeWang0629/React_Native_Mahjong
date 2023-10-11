import React, { useEffect} from 'react'
import { View, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useGetGameQuery } from '../../api/gameEditApi';
import { setGameList } from '../../store/global';
import  Icon  from "react-native-vector-icons/Ionicons";
import NoData from './noData';

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<{[x: string]: any}>();
    const dispatch = useDispatch();

    const { data: getGame } = useGetGameQuery(1);
    const { gameList } = useSelector((state:RootState) => state.global);
    console.log("=================getGame================", getGame);

    useEffect(()=>{
        dispatch(setGameList(getGame));
    },[getGame]);

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.list}>
            <Icon name="enter-outline" size={30} />
            <View style={styles.text}>
                <Text>{item.event_date}</Text>
            </View>
        </View>
    );

    const createGame = () => {
        navigation.navigate('GameEditScreen');
    }

    return (
        <>
            {
                gameList && gameList.length ?
                (   

                    <FlatList
                        data={gameList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id?.toString()}
                    />
   
                ) :
                (
                    <NoData/>
                )
            }
            {
                gameList && gameList.length ?
                (
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={createGame}>
                            <Icon name="add-circle-outline" size={60} />
                        </TouchableOpacity>
                    </View>
                ) : (
                    ''
                )
            }
        </>
    )
};

export default HomeScreen;