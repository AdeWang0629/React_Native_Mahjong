import React, {useState, useEffect} from 'react'
import { View, Text, Button } from 'react-native'
import  Modal  from 'react-native-modal'

interface IEditModal {
    modalState ?: boolean
}

const EditModal: React.FC<IEditModal> = ({modalState}) => {
    const [modalVisible, setModalVisible] = React.useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    }

    React.useState(()=>{
        if (modalState) {
            // setModalVisible(modalState); 
            console.log(modalState);
        }
    });

    return (
        <Modal isVisible={modalVisible}>
            {/* Add your modal content here */}
            <View style={{ flex: 1, backgroundColor: 'red' }}>
                <Text>Hello!</Text>
                <Button title='Hide Modal' onPress={toggleModal}/>
            </View>
        </Modal>
    )
}

export default EditModal;