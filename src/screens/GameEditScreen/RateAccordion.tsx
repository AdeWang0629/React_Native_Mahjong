import React, {useState} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import COLORS from '../../theme/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { IRateAccordion } from '../../interface/RateAccordion';
import  BestIcon  from "react-native-vector-icons/Ionicons";

const RateAccordion : React.FC<IRateAccordion> = ({ children, title, source, right_item, expandedRate, setExpandedRate, setExpandedChip }) => {

    const toggleItem = () => {
        setExpandedChip(false);
        setExpandedRate(!expandedRate);
    }
  
    const body = <View style={styles.accordBody}>{ children }</View>;

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
                
                <Text style={styles.normalText}>{ (right_item / 10).toFixed(1) }</Text>

            </TouchableOpacity>

            { expandedRate && body }
            
        </View>
    );
};

export default RateAccordion;

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