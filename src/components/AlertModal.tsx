import React from 'react'
import { StyleSheet, View, Text, Button} from 'react-native'
import Modal from 'react-native-modal'
import COLORS from '../theme/colors'
import { 
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen'

import { IAlertModal } from '../interface/AlertModal'
import { useDispatch } from 'react-redux'
import { setAlertModalState } from '../store/global'
import NormalButton from './NormalButton'

const AlertModal : React.FC<IAlertModal> = ({modalState, label}) => {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = React.useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        dispatch(setAlertModalState(!modalVisible));
    }

    React.useEffect(()=>{
        setModalVisible(modalState);
    });

    return (
        <Modal isVisible={modalVisible}>

            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                    <View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.normalText}>警告</Text>
                            <Text style={styles.text}>   {label}   </Text>
                        </View>

                        <View style={{marginVertical: 10, margin: 'auto'}}>
                            <NormalButton label='OK' onPress={toggleModal} bgColor={COLORS.PINK} />
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

export default AlertModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        height: hp(25), 
        width: wp(60), 
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: wp(4),
    },
    normalText: {
        fontSize: 20,
        paddingBottom: 5,
    },
    text: {
        fontSize: 15,
        paddingVertical: 5
    }
})