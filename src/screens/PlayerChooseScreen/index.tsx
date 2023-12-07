import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useGetPlayerQuery } from '../../api/playerEditApi';
import NoData from './noData';
import styles from './style';
import  Icon  from "react-native-vector-icons/Ionicons";
import { IListItem } from '../../interface/ListItem';
import { setPlayerList } from '../../store/global';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import Spinner from 'react-native-loading-spinner-overlay';
import AlertModal from '../../components/AlertModal';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const PlayerChooseScreen: React.FC = () => {
    const { data: getPlayer, isLoading, isFetching } = useGetPlayerQuery(1);
    const {playerlist, alertModalState, players} = useSelector((state:RootState) => state.global);
    const dispatch = useDispatch();

    useEffect(()=>{
        if (players) {
            if (players.length) {

                if (getPlayer !== undefined) {

                    const newGetPlayerData = getPlayer.map((item:any)=>{

                        return {...item, 'checked': false}

                    });                       

                    const newGetPlayer = newGetPlayerData.map((_item:any) => {
                        
                        return {..._item, 'checked': players.filter((__item:any)=>_item.id == __item.id).length > 0}

                    });
                    
                    dispatch(setPlayerList(newGetPlayer));
                }
            }else {

                dispatch(setPlayerList(getPlayer));
                
            }
            // }else if (!playerlist.length) {

            //     if (getPlayer !== undefined) {

            //         dispatch(setPlayerList(getPlayer));

            //     }

            // }
        }
    },[getPlayer]);

    if (isLoading || isFetching) {
        return <Spinner visible={true} />;
    }

    const handleItemCheck = (id ?: number) => {
        const newListItems = playerlist.map((item: any) => {
        if (item.id === id) {
            return { ...item, checked: !item.checked };
        } else {
            return item;
        }
        });
        dispatch(setPlayerList(newListItems));
    };
    
    const renderItem = ({ item }: { item: IListItem }) => (
        <TouchableOpacity
            onPress={()=> handleItemCheck(item.id)}
            activeOpacity={1}
        >
            <View style={styles.list}>

                    <CheckBox
                        style={{flex: 1}}
                        onClick={()=> handleItemCheck(item.id)}
                        isChecked={Boolean(item.checked)}
                        checkedImage={<Icon name="checkmark-outline" size={30} style={{color: '#1168d7'}}/>}
                        unCheckedImage={<Text></Text>}
                        leftTextStyle={{fontSize: 18}}
                        leftText={`${item.name}`}
                        uncheckedCheckBoxColor={'white'}
                    />
    
                {/* ERROR */}
            </View>
        </TouchableOpacity>
      );

    return (
        <>
            {
                getPlayer && getPlayer.length ? (
                    <>
                        <FlatList
                            data={playerlist}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id?.toString()}
                        />

                        <AlertModal modalState={alertModalState} label={'３人か４人を選択ください。'} />
                    </>
                    
                ) : (
                    <NoData />
                )
            }
        </>
    )
};

export default PlayerChooseScreen;