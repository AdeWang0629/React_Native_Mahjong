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
                            <TouchableOpacity onPress = {async () => {const result = await deletePlayer(item.id); console.log(result);}}>
                                <Icon name="remove-circle" size={30} style={MARGIN.marginRight3} />
                            </TouchableOpacity>
                            <Text>
                                {item.name}
                            </Text>
                        </View>
                    ))
                }

                <EditModal modalState={modalState} />
            </View>
        </ScrollView>
    )
};

export default PlayerEditScreen;