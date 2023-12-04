import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import COLORS from '../theme/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { IButtonProps } from '../interface/Button';

const NormalButton : React.FC<IButtonProps> = ({ label, onPress, disabled, bgColor }) => {
    return (
        <TouchableOpacity
            style={[styles.button, {backgroundColor: bgColor && `${bgColor}`}]}
            onPress={onPress ? onPress : () => alert("clicked")}
        >
            <Text style={styles.label}>{label ? label : "Button"}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.BLACK,
        height: hp(5),
        width: wp(53),
        paddingVertical: 1,
        zIndex: 100,
        alignItems: 'center', 
        justifyContent: 'center',
    },
    label: {
        color: COLORS.WHITE,
        fontWeight: "700",
        textAlign: "center",
        fontSize: 18
    },
});

export default NormalButton;