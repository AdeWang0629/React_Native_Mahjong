import * as React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import  Icon  from "react-native-vector-icons/Ionicons";
import MARGIN from '../../theme/margin';
import EditModal from '../../components/EditModal';

import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useGetPlayerQuery, useDeletePlayerMutation } from '../../api/playerEditApi';
import DeleteModal from '../../components/DeleteModal';

const PlayerEditScreen : React.FC = () => {
    const navigation = useNavigation<{[x: string]: any}>();

    const [listState, setListState] = React.useState<{ id: number; name: string; }[]>([]);
    const [ editModalState, setEditModalState ] = React.useState(false);

    const { modalState } = useSelector((state: RootState) => state.global);

    //RTK QUERY
    const { data : getPlayer } = useGetPlayerQuery(1);
    const [ deletePlayer ] = useDeletePlayerMutation();

    React.useEffect(()=>{
        setEditModalState(modalState);
    });

    React.useEffect(()=>{
        setListState(getPlayer);
    },[getPlayer]);

    const [deleteModalState, setDeleteModalState] = React.useState(false);
    const [itemId, setItemId] = React.useState(-1);

    const visibleModalEvent = (id:any) => {
        console.log("dfdfdfdfd", id);
        setDeleteModalState(!deleteModalState);
        if (!id) {
            setItemId(-1);
        }else {
            setItemId(id);
        }
    }

    const deleteModalEvent = async () => {
        const result = await deletePlayer(itemId); 

        if (result) {
            setDeleteModalState(!deleteModalState);
        }
    }
    
    return (
        <ScrollView>
            <View style={styles.ContentViewContainer}>
            
                {
                    listState 
                    &&
                    listState.map((item, index) => (
                        <View
                        key = {item.id}
                        style = {styles.container}  >
                            <TouchableOpacity onPress = {() => visibleModalEvent(item.id)}>
                                <Icon name="remove-circle" size={30} style={MARGIN.marginRight3} />
                            </TouchableOpacity>
                            <Text>
                                {item.name}
                            </Text>
                        </View>
                    ))
                }
                
                <EditModal modalState={modalState} />

                <DeleteModal modalState={deleteModalState} visibleModalEvent={visibleModalEvent} deleteModalEvent={deleteModalEvent}/>
            </View>
        </ScrollView>
    )
};

export default PlayerEditScreen;