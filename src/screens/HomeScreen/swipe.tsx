import React, { useState, useEffect} from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { useGetGameQuery } from '../../api/gameEditApi';
import { setGameList } from '../../store/global';
// import  Icon  from "react-native-vector-icons/Ionicons";
import NoData from './noData';
import moment from 'moment';
import { useDeleteGameMutation } from '../../api/gameEditApi';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const HomeScreen: React.FC = () => {

    const navigation = useNavigation<{[x: string]: any}>();
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);
    const { data: getGame, refetch, isLoading, isFetching } = useGetGameQuery(1);
   
    const { gameList } = useSelector((state:RootState) => state.global);
    const [ deleteGame ] = useDeleteGameMutation();
    
    useEffect(()=>{
        dispatch(setGameList(getGame));
    },[getGame]);

    if (isLoading || isFetching) {
        return <Spinner visible={true} />;
    }

    const refetchAction = () => {
        refetch();
    }

    const onPress = (item : any) => {
        if (item.status) {
            navigation.navigate('ScoreViewScreen', {item: item});
        }else {
            navigation.navigate('ScoreScreen', {item: item, refetchAction: refetchAction});
        }
        setPage(page + 1);
    }

    const renderItem = ({ item, index }: { item: any, index:any }) => {
       
        return (
            <Swipeable
                renderRightActions={RightActions}
                onSwipeableWillOpen={() => deleteGame(item.id)}
                key = {item.id}
            >
                <TouchableOpacity onPress={()=> onPress(item)}>

                    <View style={styles.list}>

                        <View style={styles.text}>
                            <Text style={{fontSize: 16}}>{moment(item.event_date).format("YYYY/M/D ddd")}</Text>
                        </View> 
                        
                        <Text>
                            {'['}
                        </Text>

                        {item.players.map((item : any, number : any)=>(
                            <View style={styles.playerName} key={number}>
                                <Text>
                                    {item.name}
                                </Text>
                            </View>
                        ))}

                        <Text>
                            {']'}
                        </Text>
                    </View>

                </TouchableOpacity>
                
            </Swipeable>
        )
    };

    const createGame = () => {
        navigation.navigate('GameEditScreen');
    }

    const RightActions = () => {
        return (
          <View
            style={{ flex: 1, justifyContent: 'center' }}>
            <Text
              style={{
                paddingHorizontal: 10,
                fontWeight: '600'
              }}>
            </Text>
          </View>
        )
    }

    return (
        <>
            {
                getGame.length ? (
                    <GestureHandlerRootView style={{ flex: 1 }}>
                        
                        <FlatList
                            data={gameList}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id?.toString()}
                        />

                    </GestureHandlerRootView>
                ) : (
                    <NoData />
                )
            }
            
        </>
    )
};

export default HomeScreen;