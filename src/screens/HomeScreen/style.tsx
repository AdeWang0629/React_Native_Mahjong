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
        height: hp(6)
    },
    text: {
        paddingLeft: wp(8),
        paddingRight: wp(5)
    },
    iconContainer: {
        position: 'absolute',
        bottom: hp(5),
        right: wp(5),
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
     },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    playerName: {
        paddingHorizontal: wp(.8),
    },
    C_container: {
        height: hp(8),
        marginVertical: hp(1.2),
        backgroundColor: '#ffffff',
        // justifyContent: 'center',
        paddingLeft: wp(6),
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        verticalAlign: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: COLORS.WHITE,
        borderWidth: .6,
        borderColor: COLORS.WEAKGREY,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: wp(3.8),
        paddingLeft: wp(6),
        borderRightColor: COLORS.BLACK,
    },
    rightAction: {
        paddingVertical: hp(2.5),
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
        // marginVertical: hp(.5),
    },
    deleteText: {
        fontSize: 18,
        color: COLORS.WHITE
    }
})

export default styles;