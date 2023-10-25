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
        color: COLORS.WEAKGREY,
        paddingVertical: hp(2)
    },
    mainAvatar: {
        width: wp(50),
        height: hp(20)
    },
    list: {
        backgroundColor: COLORS.WHITE,
        borderBottomWidth: .8,
        borderBottomColor: COLORS.WEAKGREY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: wp(6),
        paddingRight: wp(3),
        height: hp(6)
    }
})

export default styles;