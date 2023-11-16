import React, {useState} from 'react'

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput
} from 'react-native';
import COLORS from '../theme/colors';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ITextInput } from '../interface/TextInput';

const CTextInput:React.FC<ITextInput> = ({ title, source }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header} onPress={ () => (console.log('clicked')) }>
                <View style={styles.flexDirection}>
                    <Image source={source} style={styles.avatar} />
                    <Text style={styles.title}>{ title }</Text>
                </View>
                
                <TextInput placeholder={`${title}を入力してください。`} />

            </TouchableOpacity>
        </View>
    );
};

export default CTextInput;

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