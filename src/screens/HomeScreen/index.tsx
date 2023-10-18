import React, { useState, useEffect} from 'react'
import { View, ScrollView, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useGetGameQuery } from '../../api/gameEditApi';
import { setGameList } from '../../store/global';
import  Icon  from "react-native-vector-icons/Ionicons";
import NoData from './noData';
import moment from 'moment';
import { useDeleteGameMutation } from '../../api/gameEditApi';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const HomeScreen: React.FC = () => {
    const navigation = useNavigation<{[x: string]: any}>();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const { data: getGame, refetch } = useGetGameQuery(1);
   
    const { gameList } = useSelector((state:RootState) => state.global);
    const [ deleteGame ] = useDeleteGameMutation();

    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        refetch();
    });

    useEffect(()=>{
        dispatch(setGameList(getGame));
        setLoading(false);
    },[getGame]);

    const onPress = (item : any) => {
        if (item.status) {
            navigation.navigate('ScoreViewScreen', {item: item});
        }else {
            navigation.navigate('ScoreScreen', {item: item});
        }
        setPage(page + 1);
    }

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={()=> onPress(item)}>

            <View style={styles.list}>
                
                <Icon name="enter-outline" size={30} />

                <View style={styles.text}>
                    <Text>{moment(item.event_date).format("YYYY/M/D ddd")}</Text>
                </View>
                
                {/* <View style={{width: wp(40)}}>

                </View> */}

                <TouchableOpacity onPress={()=> deleteGame(item.id)} style={{position: 'absolute', right: wp(4)}}>

                    <Icon name="trash-outline" size={25}/>

                </TouchableOpacity>
                
            </View>

        </TouchableOpacity>
    );

    const createGame = () => {
        navigation.navigate('GameEditScreen');
    }

    return (
        <>
            {
                loading ? (
                    <View style={[styles.loadingContainer, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                ) : gameList && gameList.length ? (
                    <FlatList
                        data={gameList}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id?.toString()}
                    />
                ) : (
                    <NoData />
                )
            }
            
            {
                gameList && gameList.length ? (
                    <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={createGame}>
                        {/* <Icon name="add-circle-outline" size={60} /> */}
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