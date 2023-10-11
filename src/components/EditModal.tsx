import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, TextInput, Button, Image } from 'react-native'
import Modal from 'react-native-modal'
import { setModalState } from '../store/global'
// import { useDispatch } from 'react-redux'
import COLORS from '../theme/colors'
import { 
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp 
} from 'react-native-responsive-screen'

import { useDispatch, useSelector } from 'react-redux';
import { useCreatePlayerMutation } from '../api/playerEditApi'
import { IEditModal } from '../interface/EditModal'

const EditModal : React.FC<IEditModal> = ({modalState}) => {
    const [modalVisible, setModalVisible] = React.useState(modalState);
    const [text, onChangeText] = React.useState('');

    const dispatch = useDispatch();
    const [ createPlayer ] = useCreatePlayerMutation();

    const toggleModal = () => {
        setModalVisible(!modalVisible);
        dispatch(setModalState(!setModalVisible));
    }

    const editPlayer = async () => {
        const result = await createPlayer(text);
        setModalVisible(!modalVisible);
        dispatch(setModalState(!setModalVisible));
        onChangeText('');
    }

    React.useEffect(()=>{
        setModalVisible(modalState);
    });

    const edit_avatar = require("../../assets/edit_avatar.png");

    return (
        <Modal isVisible={modalVisible}>

            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Image source={edit_avatar} style={styles.avatar}/>
                    <View style={{flex: 1}}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.normalText}>編集</Text>
                            <Text style={styles.text}>   プレイヤー名を入力してください   </Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            placeholder={'プレイヤー名'}
                            value={text}
                        />
                        <View style={{marginBottom: 10}}>
                            <Button title='OK' onPress={editPlayer} color={COLORS.PINK}/>
                        </View>
                        <View>
                            <Button title='キャンセル' onPress={toggleModal} color={COLORS.BLACK}/>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default EditModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        height: hp(31), 
        width: wp(60), 
        backgroundColor: COLORS.WHITE,
        alignItems: 'center',
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
    },
    input: {
        height: hp(4),
        marginVertical: 15,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#a428ff',
        paddingLeft: 10
    },
    avatar: {
        width: wp(12), 
        height: hp(5), 
        marginTop: -hp(2),
        marginBottom: 10
    }
})