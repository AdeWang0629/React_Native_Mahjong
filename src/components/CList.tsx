import React, {useState} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../theme/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { IList } from '../interface/List';

const CList : React.FC<IList> = ({ title, source, action,}) => {
    const [ expanded, setExpanded ] = useState(false);
    const navigation = useNavigation<{[x: string]: any}>();

    const toggleItem = () => {
        if(action == 'PlayerChooseScreen'){
            navigation.navigate(action);
        }
        setExpanded(!expanded);
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={ toggleItem }>
                <View style={styles.flexDirection}>
                    <Image source={source} style={styles.avatar} />
                    <Text style={styles.title}>{ title }</Text>
                </View>
                
                <Icon name={expanded ? 'chevron-right' : 'chevron-down'} size={15} color="#bbb" />

            </TouchableOpacity>
        </View>
    );
};

export default CList;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: .4,
        paddingTop: 1
    },
    header: {
        paddingVertical: 7,
        paddingHorizontal: 20,
        backgroundColor: COLORS.WHITE,
        color: '#eee',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center', 
    },
    title: {
        fontSize: 15,
        paddingTop: hp(.6),
        paddingLeft: wp(3)
    },
    avatar: {
        width: 30,
        height: 30
    },
    normalText: {
        color: COLORS.WEAKGREY
    },
    flexDirection: {
        flexDirection: 'row'
    }
});