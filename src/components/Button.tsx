import * as React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import COLORS from '../theme/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

interface ButtonProps {
    label?: string;
    onPress?: () => void;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onPress, disabled }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress ? onPress : () => alert("clicked")}
        >
            <Text style={styles.label}>{label ? label : "Button"}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.RED,
        borderRadius: 40,
        height: 50,
        width: 210,
        paddingVertical: 5,
        zIndex: 100,
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: hp(3)
    },
    label: {
        color: COLORS.WHITE,
        fontWeight: "700",
        textAlign: "center",
    },
});

export default Button;