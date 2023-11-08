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
        paddingVertical: wp(3.8),
        paddingLeft: wp(6),
        marginVertical: hp(.5),
    },
    // container: {
    //     height: hp(8),
    //     marginVertical: hp(1.2),
    //     backgroundColor: '#ffffff',
    //     justifyContent: 'center',
    //     paddingLeft: wp(6),
    //     shadowColor: '#000',
    //     shadowOffset: {
    //       width: 0,
    //       height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 5,
    // },
    rightAction: {
        paddingVertical: hp(2),
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginVertical: hp(.5),
    },
    deleteText: {
        fontSize: 16,
        letterSpacing: 1,
        color: COLORS.WHITE
    }
})

export default styles;