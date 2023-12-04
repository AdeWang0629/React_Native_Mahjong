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
import Swipelist from 'react-native-swipeable-list-view';
import COLORS from '../../theme/colors';

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

    const visibleModalEvent = (id:any) => {
        const result = deletePlayer(id); 
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
        <ScrollView>
            <View style={styles.ContentViewContainer}>

                <View style={{height: 10}}>

                </View>

                {
                    listState 
                    &&
                    (
                        <Swipelist
                            data={listState}
                            renderRightItem={(data, index) => (
                                <View key={index} style={[styles.container, index == 0 && ({borderTopWidth: 1, borderTopColor: 'grey'}),]}>

                                    <Text style={{fontSize: 18}}>
                                        {data.name}
                                    </Text>

                                </View>
                            )}
                            renderHiddenItem={(data, index) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                    style={[styles.rightAction, { backgroundColor: COLORS.RED }]}
                                    onPress={() => visibleModalEvent(data.id)}
                                    >
                                        {/* <Icon name='trash-outline' size={18} style={{color: COLORS.WHITE}}/>
                                         */}
                                         <Text style={styles.deleteText}>
                                         削   除
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            rightOpenValue={130}
                        />
                    )
                }


                <EditModal modalState={modalState} />
            </View>
        </ScrollView>
    )
};

export default PlayerEditScreen;