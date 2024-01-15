import { StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import COLORS from "../../theme/colors";

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        // height: hp(6),
        alignItems: 'center'
    },
    container: {
        height: hp(94),
        backgroundColor: COLORS.BLACK,
        paddingTop: hp(5),
    },
    headerTap: {
        backgroundColor: COLORS.BLACK,
        borderWidth: 1,
        borderBottomWidth: 2,
        width: wp(50),
        alignItems: 'center',
    },
    normalFontSize: {
        fontSize: 20,
        color: COLORS.WHITE
    },
    selectBoxContaier: {
        flex: 1, 
        alignItems: 'center',
        width: wp(100),
    },
    selectBox: {
        backgroundColor: COLORS.BLACK,
        borderWidth: 1,
        borderBottomWidth: 2,
        width: wp(45),
        alignItems: 'center',
        paddingVertical: 5,
    },
    selectBoxContent: {
        backgroundColor: COLORS.BLACK,
        borderWidth: 1,
        borderBottomWidth: 2,
        width: wp(45),
        paddingHorizontal: wp(5)
    },
    smallFontSize: {
        fontSize: 16,
        color: COLORS.WHITE,
        marginHorizontal: 5
    },
    playerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    middle_width: {
        width: wp(18),
    },
    smallFontSizeSecond: {
        fontSize: 16,
        color: COLORS.WHITE,
    },
})

export default styles;