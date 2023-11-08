import * as React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import  Icon  from "react-native-vector-icons/Ionicons";
import MARGIN from '../../theme/margin';
import EditModal from '../../components/EditModal';

import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { useGetPlayerQuery, useDeletePlayerMutation } from '../../api/playerEditApi';
import DeleteModal from '../../components/DeleteModal';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const PlayerEditScreen : React.FC = () => {

    const [ listState, setListState ] = React.useState<{ id: number; name: string; }[]>([]);
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

    // const [deleteModalState, setDeleteModalState] = React.useState(false);

    // const [itemId, setItemId] = React.useState(-1);

    const visibleModalEvent = (id:any) => {
        // setDeleteModalState(!deleteModalState);
        // if (!id) {
        //     setItemId(-1);
        // }else {
        //     setItemId(id);
        // }

        const result = deletePlayer(id); 
        const updatedList = listState.filter((item) => item.id !== id);
        setListState(updatedList);
    }

    // const deleteModalEvent = async () => {
    //     const result = await deletePlayer(itemId); 

    //     if (result) {
    //         setDeleteModalState(!deleteModalState);
    //     }
    // }
    
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
        <ScrollView>
            <View style={styles.ContentViewContainer}>

                    <GestureHandlerRootView style={{ flex: 1 }}>

                        {
                            listState 
                            &&
                            listState.map((item, index) => (
                                <Swipeable
                                    renderRightActions={RightActions}
                                    onSwipeableWillOpen={() => visibleModalEvent(item.id)}
                                    key = {item.id}
                                >
                                    <View
                                    style = {styles.container}  >
                                        <Text>
                                            {item.name}
                                        </Text>
                                    </View>
                                </Swipeable>
                            ))
                        }

                    </GestureHandlerRootView>

                <EditModal modalState={modalState} />

                {/* <DeleteModal modalState={deleteModalState} visibleModalEvent={visibleModalEvent} deleteModalEvent={deleteModalEvent}/> */}
            </View>
        </ScrollView>
    )
};

export default PlayerEditScreen;