import { StyleSheet } from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen'
import COLORS from "../../theme/colors";

const styles = StyleSheet.create({
    ContentViewContainer: {
        flex: 1, 
        marginTop: hp(4)
    },
    SectionContainerHeader: {
        marginHorizontal: wp(5),
        marginBottom: 10
    },
    SectionContainerContent: {
        borderTopWidth: .2,
        borderBottomWidth: .2,
        shadowColor: COLORS.WEAKGREY,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 10
    },
    SectionContainer: {
        marginBottom: hp(4),
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
    textSmall: {
        fontSize: 16
    },
    center: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    }
})

export default styles;