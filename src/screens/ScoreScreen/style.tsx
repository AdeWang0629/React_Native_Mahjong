import { StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import COLORS from "../../theme/colors";

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row'
    },
    smallBox: {
        backgroundColor: COLORS.WEAKGREY1,
        height: hp(4),
        width: wp(15),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .6, 
        borderColor: 'grey',
        textAlign: 'center'
    },
    bigBox: {
        height: hp(4),
        width: wp(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .6, 
        borderColor: 'grey'
    },
    headerBox: {
        height: hp(4),
        width: wp(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .6, 
        borderColor: 'grey',
        backgroundColor: COLORS.WEAKGREY2,
    },
    desBox: {
        height: hp(4),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: .6, 
        borderColor: 'grey',
        backgroundColor: COLORS.WEAKGREY2,
        // marginBottom: hp(2)
    },
    addButton: {
        height: hp(4),
        backgroundColor: COLORS.GREY,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    saveButton: {
        height: hp(6),
        width: wp(60), 
        backgroundColor: COLORS.PINK,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row'
    },
    normalText: {
        fontSize: 13,
        fontWeight: '700'
    },
    numberText: {
        fontSize: 14,
    },
    customTextInput: {
        textAlign: 'center', 
        width: '100%',
        height: '100%',
        fontSize: 14.5
    },
    customText: {
        textAlign: 'center', 
        fontSize: 14.5
    },
})

export default styles;