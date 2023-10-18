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
        backgroundColor: '#f0f0f0',
        height: hp(6),
        width: wp(15),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1, 
        borderColor: 'black',
        textAlign: 'center'
    },
    bigBox: {
        height: hp(6),
        width: wp(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1, 
        borderColor: 'black'
    },
    text: {
        fontSize: 20,
        fontWeight: '700'
    },
    headerBox: {
        height: hp(6),
        width: wp(20),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1, 
        borderColor: 'black',
        backgroundColor: COLORS.GREEN
    },
    desBox: {
        height: hp(6),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1, 
        borderColor: 'black',
        backgroundColor: COLORS.GREEN
    },
    addButton: {
        height: hp(6),
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
        fontSize: 15,
        fontWeight: '700'
    }
})

export default styles;