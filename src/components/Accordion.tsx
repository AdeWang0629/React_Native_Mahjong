import React, {useState, ReactNode} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../theme/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

interface IAccordion{
    children: ReactNode;
    title?: string;
    source: ImageSourcePropType;
    right_item?: string;
    action ?: string;
}

const Accordion:React.FC<IAccordion> = ({ children, title, source, right_item, action }) => {
    const [ expanded, setExpanded ] = useState(false);
    const navigation = useNavigation<{[x: string]: any}>();

    const toggleItem = () => {
        if(action == 'PlayerChooseScreen'){
            navigation.navigate(action);
        }
        setExpanded(!expanded);
    }
  
    const body = <View style={styles.accordBody}>{ children }</View>;
    
    let item;

    if (right_item == "chevron-right") {
        item = (
            <Icon name={expanded ? 'chevron-right' : 'chevron-down'} size={15} color="#bbb" />
        );
    } else if(typeof(right_item)){
        item = (
            <Text style={styles.normalText}>{ right_item }</Text>
        );
    }

    return (
        <View style={styles.accordContainer}>
            <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
                <View style={styles.flexDirection}>
                    <Image source={source} style={styles.avatar} />
                    <Text style={styles.accordTitle}>{ title }</Text>
                </View>

                { item }

            </TouchableOpacity>

            { expanded && body }
        </View>
    );
};

export default Accordion;

const styles = StyleSheet.create({
    accordContainer: {
        borderBottomWidth: .4,
        paddingTop: 1
    },
    accordHeader: {
        paddingVertical: 7,
        paddingHorizontal: 20,
        backgroundColor: COLORS.WHITE,
        color: '#eee',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center', 
    },
    accordTitle: {
        fontSize: 15,
        paddingTop: hp(.6),
        paddingLeft: wp(3)
    },
    accordBody: {
        // padding: 12
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