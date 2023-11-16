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
import { IAccordion } from '../interface/Accordion';
import  BestIcon  from "react-native-vector-icons/Ionicons";

const Accordion : React.FC<IAccordion> = ({ children, title, source, right_item, action, decimal }) => {
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

    if (decimal) {

        item = (<Text style={styles.normalText}>{ (right_item / 10).toFixed(1) }</Text>);

    }else{
        item = (
            <Text style={styles.normalText}>{ right_item }</Text>
        );
    }

    return (
        <View style={styles.accordContainer}>

            <TouchableOpacity style={styles.accordHeader} onPress={ toggleItem }>
                <View style={styles.flexDirection}>
                    {source == 'date' ? (
                        <BestIcon name="calendar-outline" size={30} />
                    ) : (
                        <Image source={source} style={styles.avatar} />
                    )}         
                    <Text style={styles.accordTitle}>{ title }</Text>
                </View>
                
                { item && item}

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
        color: COLORS.WEAKGREY,
        fontSize: 18
    },
    flexDirection: {
        flexDirection: 'row'
    }
});