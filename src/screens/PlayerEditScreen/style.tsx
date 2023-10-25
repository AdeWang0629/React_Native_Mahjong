import { StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import COLORS from "../../theme/colors";

const styles = StyleSheet.create({
    ContentViewContainer: {
        flex: 1, 
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
    container: {
        backgroundColor: COLORS.WHITE,
        borderBottomWidth: .8,
        borderBottomColor: COLORS.WEAKGREY,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: wp(3.5),
        paddingLeft: wp(6)
     }
})

export default styles;