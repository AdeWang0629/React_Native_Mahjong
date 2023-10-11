import { StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import COLORS from "../../theme/colors";

const styles = StyleSheet.create({
    NoContentViewContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    TextHeader: {
        color: COLORS.GREY,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: hp(2),
        marginBottom: hp(1)
    },
    NormalText: {
        color: COLORS.WEAKGREY
    },
    list: {
        backgroundColor: COLORS.WHITE,
        borderBottomWidth: .8,
        borderBottomColor: COLORS.WEAKGREY,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: wp(6),
        paddingRight: wp(3),
        height: hp(6)
    },
    text: {
        paddingLeft: wp(10)
    },
    iconContainer: {
        position: 'absolute',
        bottom: hp(5),
        right: wp(5),
    },
})

export default styles;