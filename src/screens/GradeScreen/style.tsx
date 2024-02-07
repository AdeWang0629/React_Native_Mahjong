import { StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import COLORS from "../../theme/colors";

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
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
        paddingVertical: hp(1.5)
    },
    bigFontSize: {
        fontSize: 22,
        fontWeight: "900",
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
        width: wp(85),
        alignItems: 'center',
    },
    selectBoxContent: {
        backgroundColor: COLORS.BLACK,
        borderWidth: 1,
        borderBottomWidth: 2,
        width: wp(85),
        paddingHorizontal: wp(5),
    },
    smallFontSize: {
        fontSize: 20,
        color: COLORS.WHITE,
        marginHorizontal: hp(.8)
    },
    playerItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: hp(1.5),
    },
    middle_width: {
        width: wp(18),
    },
    smallFontSizeSecond: {
        fontSize: 16,
        color: COLORS.WHITE,
    },
    customHeight: {
        height: hp(65),
    }
})

export default styles;