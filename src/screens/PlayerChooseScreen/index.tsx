import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useGetPlayerQuery } from '../../api/playerEditApi';
import NoData from './noData';
import styles from './style';
import  Icon  from "react-native-vector-icons/Ionicons";
import { IListItem } from '../../interface/ListItem';
import { setPlayerList } from '../../store/global';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useUpdatePlayerMutation } from '../../api/playerEditApi';

const PlayerChooseScreen: React.FC = () => {
    const { data: getPlayer } = useGetPlayerQuery(1);
    const {playerlist} = useSelector((state:RootState) => state.global);
    const dispatch = useDispatch();
    const [ updatePlayer ] = useUpdatePlayerMutation();

    useEffect(()=>{
        dispatch(setPlayerList(getPlayer));
    },[getPlayer]);

    const handleItemCheck = (id ?: number) => {
        const newListItems = playerlist.map((item: any) => {
        if (item.id === id) {
            updatePlayer(id);
            return { ...item, checked: !item.checked };
        } else {
            return item;
        }
        });
        dispatch(setPlayerList(newListItems));
    };
    
    const renderItem = ({ item }: { item: IListItem }) => (
        <View style={styles.list}>
            {/* ERROR */}
            <CheckBox
                style={{flex: 1}}
                onClick={()=> handleItemCheck(item.id)}
                isChecked={Boolean(item.checked)}
                checkedImage={<Icon name="checkmark-outline" size={30} style={{color: '#1168d7'}}/>}
                unCheckedImage={<Text></Text>}
                leftText={`${item.name}`}
                uncheckedCheckBoxColor={'white'}
            />
        </View>
      );

    return (
        <>
            {
                playerlist && playerlist.length ? (
                    <>
                        <FlatList
                            data={playerlist}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id?.toString()}
                        />
                    </>
                    
                ) : (
                    <NoData />
                )
            }
        </>
    )
};

export default PlayerChooseScreen;