import React, { useState, useEffect} from 'react'
import { View, ScrollView, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { useDispatch } from 'react-redux';
import COLORS from '../../theme/colors';

const ScoreScreen: React.FC<any> = ({route}) => {
    const {item} = route.params;

    const navigation = useNavigation<{[x: string]: any}>();
    const dispatch = useDispatch();

    const createGame = () => {
        navigation.navigate('GameEditScreen');
    }

    const [rowCount, setRowCount] = useState(20);
    const [rows, setRows] = useState<string[][]>(Array.from({ length: rowCount }, () => ['']));

    const handleInputChange = (text: string, index: number, id:number) => {
        console.log("111", index,id);
        const newRows = [...rows];
        newRows[index][id-1] = text;
        console.log(newRows[0][id]);
        setRows(newRows);
    };

    console.log('123456789123456789', rows);
    const handleAddRow = () => {
    setRowCount(rowCount + 1);
    setRows([...rows, Array.from({ length: item.players.length }, () => '')]);
};
    const RenderHeader = () => {
        return (
            <View style={styles.rowContainer}>
                <View style={styles.smallBox}>
                    <Text style={styles.text}>No</Text>
                </View>

                {
                    item.players.map((data:any)=>(
                        <View style={styles.headerBox} key={data.id}>
                            <Text>{data.name}</Text>
                        </View>
                    ))
                }
            </View>
        )
    }

    const RenderContent = () => {
        return (
            <ScrollView>
                {rows.map((row: string[], index: number) => (
                    <View style={styles.rowContainer} key={index}>

                        <View style={styles.smallBox}>
                            <Text style={styles.text}>{index + 1}</Text>
                        </View>

                        {item.players.map((data: any) => (
                            <View style={styles.bigBox} key={data.id}>
                                <TextInput
                                    value={row[data.id-1] || ''}
                                    onChangeText={(text) => handleInputChange(text, index, data.id)}
                                />
                            </View>
                        ))}

                    </View>
                ))}

                <View style={{alignItems: 'center', marginTop: 30, marginBottom: 50}}>
                    <TouchableOpacity style={styles.addButton} onPress={handleAddRow}>
                        <Text style={[styles.text, {color: COLORS.WHITE}]}>追        加</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        );
    };

    return (
        <View>

            <RenderHeader />

            <RenderContent />

        </View>
    )
};

export default ScoreScreen;