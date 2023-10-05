import* as React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import  Icon  from "react-native-vector-icons/Ionicons";
import MARGIN from '../../theme/margin';
import EditModal from '../../components/EditModal';

const PlayerEditScreen = () => {
    const navigation = useNavigation<{[x: string]: any}>();

    const [listState, setListState] = React.useState<{ id: number; name: string; }[]>([]);
    const [modalVisibleState, setModalVisibleState] = React.useState(false);

    const data = [
        {
           id: 0,
           name: '佐藤',
        },
        {
           id: 1,
           name: '鈴木',
        },
        {
           id: 2,
           name: '田中',
        },
        {
           id: 3,
           name: '中村',
        }
    ]

    React.useEffect(()=>{
        setListState(data);
    }, []);

    const handlePress = () => {
        navigation.navigate('GameEditScreen');
    }

    return (
        <View style={styles.ContentViewContainer}>
            {
                listState.map((item, index) => (
                    <TouchableOpacity
                       key = {item.id}
                       style = {styles.container}
                       onPress = {() => alert(item)}>
                        <Icon name="remove-circle" size={30} style={MARGIN.marginRight3}/>
                        <Text>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                 ))
            }

            <EditModal />
        </View>
    )
};

export default PlayerEditScreen;