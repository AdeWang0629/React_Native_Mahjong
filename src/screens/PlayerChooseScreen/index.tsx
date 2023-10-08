import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useGetPlayerQuery } from '../../api/playerEditApi';
import NoData from './noData';
import styles from './style';
import  Icon  from "react-native-vector-icons/Ionicons";
import { ListItem } from '../../interface/listItem';
import { setPlayerList } from '../../store/global';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const PlayerChooseScreen: React.FC = () => {
    const { data: getPlayer } = useGetPlayerQuery(1);

    const [listItems, setListItems] = useState<ListItem[]>([]);

    React.useEffect(()=>{
        setListItems(getPlayer);
    },[getPlayer]);

    const dispatch = useDispatch();

    const handleItemCheck = (id ?: number) => {
        const newListItems = listItems.map((item) => {
        if (item.id === id) {
            return { ...item, checked: !item.checked };
        } else {
            return item;
        }
        });
        setListItems(newListItems);
        dispatch(setPlayerList(newListItems));
    };
    
    const {playerlist} = useSelector((state:RootState) => state.global);
    console.log('playerlist', playerlist);
    console.log("dfdfdf", "dfdfd");
    const renderItem = ({ item }: { item: ListItem }) => (
        <View style={styles.list}>
            <CheckBox
                style={{flex: 1}}
                onClick={()=> handleItemCheck(item.id)}
                isChecked={item.checked}
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
                !listItems ? (
                    <NoData />
                ) : (
                    <>
                        <FlatList
                            data={listItems}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id?.toString()}
                        />
                    </>
                )
            }
        </>
    )
};

export default PlayerChooseScreen;