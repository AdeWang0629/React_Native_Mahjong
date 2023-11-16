import React from 'react'
import { StyleSheet, View, Text, Button} from 'react-native'
import Modal from 'react-native-modal'
import COLORS from '../theme/colors'
import { 
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen'

import { IEditModal } from '../interface/EditModal'

const DeleteModal : React.FC<IEditModal> = ({modalState, visibleModalEvent, deleteModalEvent}) => {
    const [modalVisible, setModalVisible] = React.useState(modalState);

    const toggleModal = () => {
        visibleModalEvent();
    }

    const deletePlayerModal = () => {
        deleteModalEvent();
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
                            <Text style={styles.normalText}>削除</Text>
                            <Text style={styles.text}>   プレイヤーを本当に削除しますか？   </Text>
                        </View>

                        <View style={{marginVertical: 10}}>
                            <Button title='は　い' onPress={deletePlayerModal} color={COLORS.PINK}/>
                        </View>
                        <View>
                            <Button title='い　え' onPress={toggleModal} color={COLORS.BLACK}/>
                        </View>
                    </View>
                </View>
            </View>
            
        </Modal>
    )
}

export default DeleteModal;

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
        paddingHorizontal: 10
    },
    normalText: {
        fontSize: 20,
        paddingBottom: 5,
    },
    text: {
        fontSize: 13,
        paddingVertical: 5
    }
})