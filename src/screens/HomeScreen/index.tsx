import React, { useState, useEffect} from 'react'
import { 
    View, 
    Text, 
    FlatList, 
    TouchableOpacity,
    ScrollView
} from 'react-native';
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
import Spinner from 'react-native-loading-spinner-overlay';
import Swipelist from 'react-native-swipeable-list-view';
import COLORS from '../../theme/colors';
import DeleteModal from '../../components/DeleteModal';

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
   
    const showSpinner = isLoading || isFetching;
    
    const refetchAction = () => {

        refetch();
    }

    const onPress = (item : any) => {

        // if (item.status) {
        //     navigation.navigate('ScoreViewScreen', {item: item});
        // }else {
        //     navigation.navigate('ScoreScreen', {item: item, refetchAction: refetchAction});
        // }

        navigation.navigate('ScoreScreen', {item: item, refetchAction: refetchAction});

        setPage(page + 1);
    }

    const [deleteModalState, setDeleteModalState] = React.useState(false);

    const [itemId, setItemId] = React.useState(-1);

    const visibleModalEvent = (id:any) => {
        setDeleteModalState(!deleteModalState);
        if (!id) {
            setItemId(-1);
        }else {
            setItemId(id);
        }
    }

    const deleteModalEvent = async () => {
        const result = await deleteGame(itemId);
        setDeleteModalState(!deleteModalState);
    }
    if(showSpinner){
        return <Spinner visible={true}/>;
    }
    return (
        <>
            {
                getGame &&
                getGame.length ? (
                    <ScrollView>
                        <View style={{height: 10}}>

                        </View>
                        <Swipelist
                            data={gameList}
                            renderRightItem={(data, index) => (
                                <TouchableOpacity onPress={()=> onPress(data)}>
                                    <View key={index} style={styles.container}>

                                        <Text style={{fontSize: 18}}>

                                            {moment(data.event_date).format("YYYY/M/D ddd")}
                                            &nbsp;

                                        </Text>
                                        <Text> {'['} </Text>
                                            
                                        {data.players.map((item : any, number : any)=>(
                                            <View style={styles.playerName} key={number}>
                                                <Text>
                                                    {item.name}
                                                </Text>
                                            </View>
                                        ))}
                                            
                                        <Text> {']'} </Text>
              
                                    </View>
                                </TouchableOpacity>
                            )}
                            renderHiddenItem={(data, index) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                    style={[styles.rightAction, { backgroundColor: COLORS.RED }]}
                                    onPress={() => visibleModalEvent(data.id)}
                                    >
                                        {/* <Icon name='trash-outline' size={30} style={{color: COLORS.WHITE}}/>
                                         */}
                                        <Text style={styles.deleteText}>
                                            削除
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            rightOpenValue={130}
                        />
                    </ScrollView>
                ) : (
                    <NoData />
                )
            }
            
            <DeleteModal modalState={deleteModalState} visibleModalEvent={visibleModalEvent} deleteModalEvent={deleteModalEvent}/>
        </>
    )
};

export default HomeScreen;